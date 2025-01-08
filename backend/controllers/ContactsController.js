import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Message from "../models/MessagesModel.js"

export const searchContacts = async (request, response, next) => {
    try {
        const { searchTerm } = request.body;
        if (searchTerm === undefined || searchTerm === null) {
            return response.status(400).send("Search Term is required.")
        }

        const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex = new RegExp(sanitizedSearchTerm, "i");

        const contacts = await User.find({
            $and: [
                { _id: { $ne: request.userId } },
                { $or: [{ firstName: regex }, { lastName: regex }, { email: regex }] }
            ]
        })
        return response.status(200).json({ contacts });

    } catch (error) {
        return response.status(500).send("Internal Server Error")
    }
}

export const getContactsForDmList = async (request, response, next) => {
    try {
      let {userId} = request;
      userId = new mongoose.Types.ObjectId(userId);

      const contacts = await Message.aggregate([
        {
            $match:{
                $or: [{sender: userId}, {recipient: userId}]
            }
        },
        {
            $sort: {timestamp: -1}
        },
        {$group:
             {
            _id:{
                $cond:{
                    if:{$eq: ["$sender", userId]},
                    then:"$recipient",
                    else: "$sender"
                }
            },
            lastMessageTime: {$first: "$timestamp"}
            }
        },
        {
            $lookup:{
                from: "users",
                localField:"_id",
                foreignField:"_id",
                as:"contactInfo"
            }
        },
        {
            $unwind: "$contactInfo"
        },
        {
            $project: {
                _id: 1,
                lastMessageTime:1,
                email: "$contactInfo.email",
                firstName:"$contactInfo.firstName",
                lastName:"$contactInfo.lastName",
                image:"$contactInfo.image",
                color:"$contactInfo.color"
            }

        },
        {
            $sort: {timestamp: -1}
        },
      ])
      return response.status(200).json({contacts});

    } catch (error) {
        console.error('Error in getContactsForDmList:', error);
        return response.status(500).send("Internal Server Error")
    }
}

export const addFriend = async (request, response) => {
    const user = await User.findById(request.body.userId);
    const friend = await User.findById(request.body.friendId);
     try {
         if(!friend){
             return response.status(404).send("Usuário não encontrado")
         }
         user.friends.push(friend);
         await user.save();
         return response.status(200).send("Convite enviado com sucesso.")
     } catch (error) {
         return response.status(400).send("Erro ao adicionar um amigo", error)
     }

};

export const getFriends = async (request, response) => {
    try {
        const userid = request.userId;
        const user = await User.findById(userid).populate("friends");
        const userFriends = user.friends
        return response.status(200).json({ userFriends });
    } catch (error) {
        return response.status(400).send("erro:", error)
    }
};