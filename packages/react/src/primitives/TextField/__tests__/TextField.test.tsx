import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ComponentClassNames } from '../../shared';
import { DEFAULT_ROW_COUNT, TextField } from '../TextField';
import {
  testFlexProps,
  expectFlexContainerStyleProps,
} from '../../Flex/__tests__/Flex.test';
import { AUTO_GENERATED_ID_PREFIX } from '../../shared/utils';

const label = 'Field';
const testId = 'testId';
const originalWarn = console.warn;
const deprecationMessage =
  'TextField isMultiLine prop will be deprecated in next major release of @aws-amplify/ui-react. Please use TextAreaField component instead.';

describe('TextField component', () => {
  beforeAll(() => {
    console.warn = jest.fn();
  });
  afterAll(() => {
    console.warn = originalWarn;
  });

  describe('wrapper Flex', () => {
    it('should render default and custom classname ', async () => {
      const customClassName = 'my-textfield';
      render(
        <TextField
          label={label}
          id="testField"
          testId={testId}
          className={customClassName}
        />
      );

      const field = await screen.findByTestId(testId);
      expect(field).toHaveClass(customClassName);
      expect(field).toHaveClass(ComponentClassNames.Field);
      expect(field).toHaveClass(ComponentClassNames.TextField);
    });

    it('should render all flex style props', async () => {
      render(<TextField testId="testId" label="field" {...testFlexProps} />);
      const field = await screen.findByTestId('testId');
      expectFlexContainerStyleProps(field);
    });
  });

  describe('Label ', () => {
    it('should render expected field classname', async () => {
      render(<TextField label="Field" />);

      const label = (await screen.findByText('Field')) as HTMLLabelElement;
      expect(label).toHaveClass(ComponentClassNames.Label);
    });

    it('should have `amplify-visually-hidden` class when labelHidden is true', async () => {
      render(<TextField label="Search" labelHidden={true} />);

      const label = await screen.findByText('Search');
      expect(label).toHaveClass('amplify-visually-hidden');
    });
  });

  describe('Input field', () => {
    it('should render labeled input when id is provided', async () => {
      render(
        <TextField label={label} id="testField" defaultValue="Hello there" />
      );
      const field = await screen.findByLabelText(label);
      expect(field.tagName).toBe('INPUT');
      expect(field).toHaveClass(ComponentClassNames.Input);
      expect(field.id).toBe('testField');
    });

    it('should forward ref to DOM element', async () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<TextField label={label} ref={ref} />);

      await screen.findByLabelText(label);
      expect(ref.current.nodeName).toBe('INPUT');
    });

    it('should render labeled input when id is not provided, and is autogenerated', async () => {
      render(<TextField label={label} defaultValue="Hello there" />);
      const field = await screen.findByLabelText(label);
      expect(field.id.startsWith(AUTO_GENERATED_ID_PREFIX)).toBe(true);
      expect(field).toHaveClass(ComponentClassNames.Input);
    });

    it('should render the state attributes', async () => {
      render(
        <TextField
          label="Field"
          size="small"
          defaultValue=""
          hasError
          isDisabled
          isReadOnly
          isRequired
        />
      );

      const field = await screen.findByRole('textbox');
      expect(field).toHaveAttribute('disabled');
      expect(field).toHaveAttribute('readonly');
      expect(field).toHaveAttribute('required');
    });

    it('should set size and variation data attributes', async () => {
      render(
        <TextField
          label="Field"
          size="small"
          testId="testField"
          variation="quiet"
        />
      );

      const textField = await screen.findByTestId('testField');
      const input = await screen.findByRole('textbox');
      expect(textField).toHaveAttribute('data-size', 'small');
      expect(input).toHaveAttribute('data-variation', 'quiet');
    });

    it('can set defaultValue', async () => {
      render(<TextField label="Field" defaultValue="test" />);

      const field = (await screen.findByRole('textbox')) as HTMLInputElement;
      expect(field.value).toBe('test');
    });

    it('show add aria-invalid attribute to input when hasError', async () => {
      render(
        <TextField
          label="Field"
          id="testField"
          hasError={true}
          errorMessage={'Error message'}
        />
      );
      const field = (await screen.findByRole('textbox')) as HTMLInputElement;
      expect(field).toHaveAttribute('aria-invalid');
    });

    it('should fire event handlers', async () => {
      const onChange = jest.fn();
      const onInput = jest.fn();
      const onPaste = jest.fn();
      render(
        <TextField
          label="Field"
          onChange={onChange}
          onInput={onInput}
          onPaste={onPaste}
        />
      );
      const field = (await screen.findByRole('textbox')) as HTMLInputElement;
      userEvent.type(field, 'hello');
      userEvent.paste(field, 'there');
      expect(onChange).toHaveBeenCalled();
      expect(onInput).toHaveBeenCalled();
      expect(onPaste).toHaveBeenCalled();
    });
  });

  describe('Multiline textarea field', () => {
    it('should render labeled textarea when id is provided', async () => {
      render(
        <TextField
          isMultiline={true}
          label={label}
          id="testField"
          defaultValue="Hello there"
        />
      );
      const field = await screen.findByLabelText(label);
      expect(field.tagName).toBe('TEXTAREA');
      expect(field).toHaveClass(ComponentClassNames.Textarea);
      expect(field.id).toBe('testField');
      // Show deprecation message
      expect(console.warn).toHaveBeenLastCalledWith(deprecationMessage);
    });

    it('should forward ref to DOM element', async () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<TextField isMultiline={true} label={label} ref={ref} />);

      await screen.findByLabelText(label);
      expect(ref.current.nodeName).toBe('TEXTAREA');
    });

    it('should render labeled input when id is not provided, and is autogenerated', async () => {
      render(
        <TextField
          isMultiline={true}
          label={label}
          defaultValue="Hello there"
        />
      );
      const field = await screen.findByLabelText(label);
      expect(field.id.startsWith(AUTO_GENERATED_ID_PREFIX)).toBe(true);
      expect(field).toHaveClass(ComponentClassNames.Textarea);
    });

    it('should render the state attributes', async () => {
      render(
        <TextField
          isMultiline={true}
          label="Field"
          size="small"
          defaultValue=""
          hasError
          isDisabled
          isReadOnly
          isRequired
        />
      );

      const field = await screen.findByRole('textbox');
      expect(field).toHaveAttribute('disabled', '');
      expect(field).toHaveAttribute('readonly', '');
      expect(field).toHaveAttribute('required', '');
      expect(field).toHaveAttribute('rows', DEFAULT_ROW_COUNT.toString());
    });

    it('should set size and variation data attributes', async () => {
      render(
        <TextField
          isMultiline={true}
          label="Field"
          size="small"
          testId="testField"
          variation="quiet"
        />
      );

      const textField = await screen.findByTestId('testField');
      const input = await screen.findByRole('textbox');
      expect(textField).toHaveAttribute('data-size', 'small');
      expect(input).toHaveAttribute('data-variation', 'quiet');
    });

    it('can set defaultValue', async () => {
      render(
        <TextField isMultiline={true} label="Field" defaultValue="test" />
      );

      const field = (await screen.findByRole('textbox')) as HTMLTextAreaElement;
      expect(field.value).toBe('test');
    });

    it('show add aria-invalid attribute to input when hasError', async () => {
      render(
        <TextField
          isMultiline={true}
          label="Field"
          id="testField"
          hasError={true}
          errorMessage={'Error message'}
        />
      );
      const field = (await screen.findByRole('textbox')) as HTMLTextAreaElement;
      expect(field).toHaveAttribute('aria-invalid');
    });

    it('should set resize style property', async () => {
      render(
        <TextField isMultiline={true} label="Field" resize="horizontal" />
      );
      const field = (await screen.findByRole('textbox')) as HTMLTextAreaElement;
      expect(field).toHaveStyle('resize: horizontal');
    });

    it('should fire event handlers', async () => {
      const onChange = jest.fn();
      const onInput = jest.fn();
      const onPaste = jest.fn();
      render(
        <TextField
          isMultiline={true}
          label="Field"
          onChange={onChange}
          onInput={onInput}
          onPaste={onPaste}
        />
      );
      const field = (await screen.findByRole('textbox')) as HTMLTextAreaElement;
      userEvent.type(field, 'hello');
      userEvent.paste(field, 'there');
      expect(onChange).toHaveBeenCalled();
      expect(onInput).toHaveBeenCalled();
      expect(onPaste).toHaveBeenCalled();
    });
  });

  describe('error messages', () => {
    const errorMessage = 'This is an error message';
    it("don't show when hasError is false", async () => {
      render(
        <TextField label="Field" id="testField" errorMessage={errorMessage} />
      );

      const errorText = await screen.queryByText(errorMessage);
      expect(errorText).not.toBeInTheDocument();
    });

    it('show when hasError and errorMessage', async () => {
      render(
        <TextField
          label="Field"
          id="testField"
          hasError={true}
          errorMessage={errorMessage}
        />
      );
      const errorText = await screen.queryByText(errorMessage);
      expect(errorText.innerHTML).toContain(errorMessage);
    });
  });

  describe('descriptive message', () => {
    it('renders when descriptiveText is provided', async () => {
      render(
        <TextField label="Field" id="testField" descriptiveText="Description" />
      );

      const descriptiveText = await screen.queryByText('Description');
      expect(descriptiveText.innerHTML).toContain('Description');
    });

    it('should map to descriptive text correctly', async () => {
      const descriptiveText = 'Description';
      render(
        <TextField
          descriptiveText={descriptiveText}
          label="Field"
          id="testField"
        />
      );

      const field = (await screen.findByRole('textbox')) as HTMLInputElement;
      expect(field).toHaveAccessibleDescription(descriptiveText);
    });
  });
});
