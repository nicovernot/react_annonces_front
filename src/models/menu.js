import React from 'react';
import {Menubar} from 'primereact/menubar';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';


const items = [
   {
      label:'File',
      icon:'pi pi-fw pi-file',
      items:[
         {
            label:'New',
            icon:'pi pi-fw pi-plus',
            url:"/",
            items:[
               {
                  label:'Bookmark',
                  url: 'topics',
                  icon:'pi pi-fw pi-bookmark'
               },
               {
                  label:'Video',
                  url:'video',
                  icon:'pi pi-fw pi-video'
               },

            ]
         },
         {
            label:'Delete',
            icon:'pi pi-fw pi-trash'
         },
         {
            separator:true
         },
         {
            label:'Export',
            icon:'pi pi-fw pi-external-link'
         }
      ]
   },
   {
      label:'Edit',
      icon:'pi pi-fw pi-pencil',
      items:[
         {
            label:'Left',
            icon:'pi pi-fw pi-align-left'
         },
         {
            label:'Right',
            icon:'pi pi-fw pi-align-right'
         },
         {
            label:'Center',
            icon:'pi pi-fw pi-align-center'
         },
         {
            label:'Justify',
            icon:'pi pi-fw pi-align-justify'
         },

      ]
   },
   {
      label:'Users',
      icon:'pi pi-fw pi-user',
      items:[
         {
            label:'New',
            icon:'pi pi-fw pi-user-plus',

         },
         {
            label:'Delete',
            icon:'pi pi-fw pi-user-minus',

         },
         {
            label:'Search',
            icon:'pi pi-fw pi-users',
            items:[
               {
                  label:'Filter',
                  icon:'pi pi-fw pi-filter',
                  items:[
                     {
                        label:'Print',
                        icon:'pi pi-fw pi-print'
                     }
                  ]
               },
               {
                  icon:'pi pi-fw pi-bars',
                  label:'List'
               }
            ]
         }
      ]
   },
   {
      label:'Events',
      icon:'pi pi-fw pi-calendar',
      items:[
         {
            label:'Edit',
            url: 'accueil',
            icon:'pi pi-fw pi-pencil',
            items:[
               {
                  label:'Save',
                  icon:'pi pi-fw pi-calendar-plus'
               },
               {
                  label:'Delete',
                  icon:'pi pi-fw pi-calendar-minus'
               }
            ]
         },
         {
            label:'Archieve',
            
            icon:'pi pi-fw pi-calendar-times',
            items:[
               {
                  label:'Remove',
                  icon:'pi pi-fw pi-calendar-minus'
               }
            ]
         }
      ]
   },
   {
      label:'Quit',
      icon:'pi pi-fw pi-power-off'
   }
];


const Menu = (props) => {
   
    return (
        <div>
        <Menubar   model={items}>
        {props.children}
        </Menubar>   

       
        </div>
    );
};

export default Menu;