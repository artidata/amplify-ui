import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconKeyboardVoice } from '@aws-amplify/ui-react';` → `import { MdKeyboardVoice } from 'react-icons/md';`
 */
export const IconKeyboardVoice = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconKeyboardVoice } from '@aws-amplify/ui-react'; → import { MdKeyboardVoice } from 'react-icons/md';`,
  });
  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
      {...rest}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 15C13.66 15 14.99 13.66 14.99 12L15 6C15 4.34 13.66 3 12 3C10.34 3 9 4.34 9 6V12C9 13.66 10.34 15 12 15ZM10.8 5.9C10.8 5.24 11.34 4.7 12 4.7C12.66 4.7 13.2 5.24 13.2 5.9L13.19 12.1C13.19 12.76 12.66 13.3 12 13.3C11.34 13.3 10.8 12.76 10.8 12.1V5.9ZM17.3 12C17.3 15 14.76 17.1 12 17.1C9.24 17.1 6.7 15 6.7 12H5C5 15.41 7.72 18.23 11 18.72V22H13V18.72C16.28 18.24 19 15.42 19 12H17.3Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
