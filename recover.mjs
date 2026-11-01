import fs from 'node:fs';
import {spawn} from 'node:child_process';
const pages=['Housing_management_system.aspx','room_inventory_control.aspx','roommate_self_selection.aspx','Off_campus_housing.aspx','about.aspx','webinar.aspx','contact.aspx'];
await Promise.all(pages.map(page=>new Promise(resolve=>{
 const p=spawn('curl',['-sSL','--fail','--max-time','90','https://web.archive.org/web/20200221225249id_/http://www.lifetopia.com/'+page,'-o','archive/'+page+'.html']);
 p.on('close',code=>{console.log(page,code);resolve();});
})));
