import React from 'react';
import pure from 'recompose/pure';
import InnerPortal from 'containers/InnerPortal';
import PromoSubscribtions from 'containers/PromoSubscribtions';

const PromoSubscribtionsScreen = () => (
  <InnerPortal>
    <PromoSubscribtions />
  </InnerPortal>
);

export default pure(PromoSubscribtionsScreen);
