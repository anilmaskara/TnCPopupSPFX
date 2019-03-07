import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration, Dialog } from '@microsoft/sp-dialog';
import {
 autobind,
 ColorPicker,
 PrimaryButton,
 Button,
 DialogFooter,
 DialogContent
} from 'office-ui-fabric-react';
import { replaceElement } from '@uifabric/utilities';

interface IColorPickerDialogContentProps {
  close: () => void;
  submit: (color: boolean) => void;
 }
 interface IColorPickerDialogContentStats{
   ChekBoxVal:boolean;
 }
 class ColorPickerDialogContent extends React.Component<IColorPickerDialogContentProps, IColorPickerDialogContentStats> {

  constructor(props) {
    super(props);
    this.state={
      ChekBoxVal:false
    };
  }
  private handleChange = (e) => {
    let newState = {};

    newState[e.target.name] = e.target.checked;

    this.setState(newState);
  }
  public render(): JSX.Element {
    return <DialogContent
      title='Terms and Conditions'
      subText='Sub Text'
      onDismiss={this.props.close}
      showCloseButton={false}>
      <div>
        <div>
           ashjashhsa ashghgashg <br/>
           ashjashhsa ashghgashg <br/>
           ashjashhsa ashghgashg <br/>
           ashjashhsa ashghgashg <br/>
           ashjashhsa ashghgashg <br/>
           ashjashhsa ashghgashg <br/>
        </div>
        <form>
          <input  type="checkbox" name="ChekBoxVal" onChange={this.handleChange} checked={this.state.ChekBoxVal}/>
          I Accept
         </form>
      </div>
      <DialogFooter>
        <PrimaryButton text='Agree' title='Agree' onClick={() => { this.props.submit(this.state.ChekBoxVal); }} />
      </DialogFooter>
    </DialogContent>;
  }

  @autobind
  private _onColorChange(color: string): void {

  }
 }

 export default class ColorPickerDialog extends BaseDialog {
  public message: string;
  public isSelectesd: Boolean;

  constructor() {
    super({isBlocking: true});
 }
  public render(): void {
    ReactDOM.render(<ColorPickerDialogContent
      close={ this.close }
      submit={ this._submit }
    />, this.domElement);
  }

  public getConfig(): IDialogConfiguration {
    return {
      isBlocking: false
    };
  }

  protected onAfterClose(): void {
    super.onAfterClose();

    // Clean up the element for the next dialog
    ReactDOM.unmountComponentAtNode(this.domElement);
  }

  @autobind
  private _submit(IsAccept: Boolean): void {

    if(IsAccept==true)
    {
      this.isSelectesd=IsAccept;
      this.close();
    }
    else
    {
      alert('Please Accept the Terms and condition');
    }


  }
 }
