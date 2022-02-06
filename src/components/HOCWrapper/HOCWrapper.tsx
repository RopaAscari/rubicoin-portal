import { motion } from "framer-motion";
import { Transition } from "@enums/enums";
import { useSelector } from "react-redux";
import { TransitionType } from "@constants/constants";
import { RootState } from "@reducers/combinedReducers";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";

type Props = {
  children: any;
  transition: TransitionType;
};

function HOCWrapper({ transition, children }: Props) {
  const transitionState = useSelector((state: RootState) => state.transition) as any;

  const renderTransition = () => (
    <RenderDelegate
      condition={transition === Transition.Horizontal}
      renderComponent={
        <motion.div
          initial={{ x: 500 }}
          animate={{
            x: 0,
            transition: { duration: 0.5, type: "spring" },
          }}
          exit={{
            x: -500,
            transition: { duration: 0.5, type: "spring" },
          }}
        >
          {children}
        </motion.div>
      }
      fallBackComponent={
        <motion.div
          initial={{ y: 500 }}
          animate={{
            y: 0,
            transition: { duration: 0.5, type: "spring" },
          }}
          exit={{
            y: -500,
            transition: { duration: 0.5, type: "spring" },
          }}
        >
          {children}
        </motion.div>
      }
    />
  );

  return (
    <RenderDelegate
      condition={transitionState.enableTransition}
      renderComponent={renderTransition()}
      fallBackComponent={children}
    />
  );
}

export default HOCWrapper;
