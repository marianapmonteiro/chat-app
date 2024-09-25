import Lottie from 'react-lottie';
import { AnimationDefaultOptions } from '@/lib/utils';

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 flex justify-center items-center ">
      <Lottie
        isClickToPauseDisabled={true}
        width={200}
        height={200}
        options={AnimationDefaultOptions}
      ></Lottie>
    </div>
  );
};

export default EmptyChatContainer;
