import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconMoreTime = (props) => {
  const { className, ...rest } = props;
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
          d="M10 8V14L14.7 16.9L15.5 15.7L11.5 13.3V8H10Z"
          fill="currentColor"
        />
        <path
          d="M17.92 12C17.97 12.33 18 12.66 18 13C18 16.9 14.9 20 11 20C7.1 20 4 16.9 4 13C4 9.1 7.1 6 11 6C11.7 6 12.37 6.1 13 6.29V4.23C12.36 4.08 11.69 4 11 4C6 4 2 8 2 13C2 18 6 22 11 22C16 22 20 18 20 13C20 12.66 19.98 12.33 19.94 12H17.92Z"
          fill="black"
        />
        <path d="M20 5V2H18V5H15V7H18V10H20V7H23V5H20Z" fill="black" />
      </svg>
    </View>
  );
};
