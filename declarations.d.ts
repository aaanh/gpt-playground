declare module '*.svg' {
  import * as React from 'react';

  // Using React Component instead of React.FunctionComponent to avoid issue with missing defaultProps
  const content: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default content;
}