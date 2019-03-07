import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, ApplicationCustomizerContext
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'TermAndConditionApplicationCustomizerStrings';
import ColorPickerDialog from './ColorPickerDialog';
/*import pnp, { sp, Item, ItemAddResult, ItemUpdateResult,CamlQuery } from "sp-pnp-js";*/
import { PageContext } from '@microsoft/sp-page-context';
import { sp ,CamlQuery} from "@pnp/sp";

const LOG_SOURCE: string = 'TermAndConditionApplicationCustomizer';


/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITermAndConditionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TermAndConditionApplicationCustomizer
  extends BaseApplicationCustomizer<ITermAndConditionApplicationCustomizerProperties> {
  private isSelected: Boolean;
  @override

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);



    return super.onInit().then(_ => {

      // other init code may be present

      sp.setup({
        spfxContext: this.context
      });
      this.GetItem();
    });
/*
    Dialog.alert('hi1');
    let message: string = this.properties.testMessage;
    if (!message) {
      message = '(No properties were provided.)';
    }

    this.GetItem();

*/

   /* return Promise.resolve();*/
  }

  private createItem(): void {

    sp.web.lists.getByTitle('Test').items.add({
      'Title': `${this.context.pageContext.user.email}`
    });
  }
  private GetItem():void{
  let ReturnParam=false;
  const xml=`<View>
  <ViewFields>
  <FieldRef Name='ID' />
  <FieldRef Name='Title' />
  </ViewFields>
  <Query>
  <Where>
  <Eq>
  <FieldRef Name='Title' />
  <Value Type='Text'>${this.context.pageContext.user.email}</Value>
  </Eq>
  </Where>
  </Query>
  </View>`;

  const q: CamlQuery = {
    ViewXml: xml,
  };

    sp.web.lists.getByTitle("Test").getItemsByCAMLQuery(q).then((r: any[]) => {

     if(r.length==0)
     {
      const dialog: ColorPickerDialog = new ColorPickerDialog();
      dialog.message = 'Term And Condition';

      dialog.show().then(() => {
        this.isSelected = dialog.isSelectesd;

        if(this.isSelected)
        {
          this.createItem();
        }

      });
     }

    });

  }


}
