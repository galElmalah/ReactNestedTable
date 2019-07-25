import * as React from 'react';
import * as style from './CustomTableNameDisplay.scss';
import { isPrimitiveType } from '../utils';
import ChevronRightCircle from 'wix-style-react/new-icons/ChevronRightCircle';
import Minus from 'wix-style-react/new-icons/Minus';
import { Text } from '../../../Text';
import classnames from 'classnames';

export const CustomTableNameDisplay = ({
  onIconClick,
  name,
  isRotated,
  required,
  type,
}) => {
  return (
    <React.Fragment>
      <div className={style.nameWrapper}>
        <span
          className={classnames({
            [style.iconContainer]: true,
            [style.empty]: isPrimitiveType(type),
          })}
          onClick={onIconClick}
        >
          {!isPrimitiveType(type) ? (
            <React.Fragment>
              <ChevronRightCircle
                className={style.chevronIcon}
                style={{
                  transform: `rotate(${isRotated ? '90' : '0'}deg)`,
                }}
              />
              <button className={style.mobileBtn}>
                <Text size="small">{isRotated ? 'CLOSE' : 'EXPAND'}</Text>
              </button>
            </React.Fragment>
          ) : (
            <Minus className={style.minusIcon} />
          )}
        </span>

        {
          <Text size={'large'} bold>
            {name}
          </Text>
        }
      </div>
      {required && (
        <Text size={'extra-large'} bold className={style.required}>
          Required
        </Text>
      )}
    </React.Fragment>
  );
};
