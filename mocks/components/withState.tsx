import React, { useRef, useState } from 'react';

interface StatePropsBase {
  initialValue: any;
  propName?: undefined;
}

interface StateProps<P extends string> extends Omit<StatePropsBase, 'propName'> {
  propName?: P | 'value';
}

type PropsToOmit<P extends string> = P | `set${Capitalize<P>}`;

function withState<T>(
  Component: React.ComponentType<T>,
  config: StatePropsBase
): (props: Omit<T, PropsToOmit<'value'>>) => JSX.Element;

function withState<T, P extends string>(
  Component: React.ComponentType<T>,
  config: StateProps<P>
): (props: Omit<T, PropsToOmit<P>>) => JSX.Element;

function withState<T, P extends string>(
  Component: React.ComponentType<T>,
  { initialValue, propName = 'value' }: StateProps<P>,
) {
  return function WrappedComponent(props: Omit<T, PropsToOmit<P>>) {
    const [value, setValue] = useState(initialValue);
    const computedPropName = useRef({
      state: propName,
      set: `set${propName.charAt(0).toUpperCase().concat(propName.slice(1))}`,
    });

    return (
      <Component
        {...{
          [computedPropName.current.state]: value,
          [computedPropName.current.set]: setValue,
        }}
        {...(props as T)}
      />
    );
  };
}

export default withState;
