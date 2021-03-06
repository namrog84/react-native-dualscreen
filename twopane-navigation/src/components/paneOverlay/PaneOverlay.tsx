import React, { Fragment} from 'react';

import ReactNativeComponentTree, {
  View, ViewStyle, StyleProp,
} from 'react-native';
import { PaneOverlayStyles } from './PaneOverlay.styles';

interface IPaneOverlayProps {
   /**
   * Content of the overlay
   */
    children: React.ReactElement<any>;
   /**
   * If true, the overlay is visible
   */
    isVisible:  boolean;
   /**
   * Style for the backdrop
   */
    backdropStyle?: StyleProp<ViewStyle>;
   /**
   * Style of the actual overlay
   */
    overlayStyle?: StyleProp<ViewStyle>;
   /**
   * Callback when user touches the backdrop
   */
    onBackdropPress:()=> void;
}

const PaneOverlay = (props: IPaneOverlayProps) => {
  return (
    <Fragment>
      {props.isVisible && (
        <View
          style={[PaneOverlayStyles.backdrop, props?.backdropStyle!]}
            onTouchEndCapture={event => {
              //check if we are clicking ourselves or a different component
              if (
                String(ReactNativeComponentTree.findNodeHandle(event.currentTarget)) === String(event.nativeEvent.target)
              ) {
                if(props.onBackdropPress)
                {
                  props.onBackdropPress();
                }
              }
            }}>
            <View
              pointerEvents={'box-none'}
              style={[PaneOverlayStyles.overlay, props?.overlayStyle!]}>
              {props.children}
            </View>
          </View>
      )}
    </Fragment>
  );
};

export default PaneOverlay;
