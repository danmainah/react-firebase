import { db } from '../firestore'
function getAllMenuItems() {
   return new Promise((resolve, reject) => {
      db.collection("MenuItems").get().then((allMenuItems) => {
           resolve(allMenuItems);
      }).catch((e) => {
           reject(e);
      })
   })
}
export default { getAllMenuItems }