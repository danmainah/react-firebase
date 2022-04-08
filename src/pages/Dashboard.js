import React, { useState, useEffect } from 'react';
import { Table, Card, Image, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import NotLoggedInView from '../components/NoLoggedInView';

function Dashboard(props) {
const [showAddEditForm, setShowAddEditForm] = useState(false);
const [addEditFormType, setAddEditFormType] = useState('Add'); //Add, Edit
const [validated, setValidated] = useState(false);
const [menuItems, setMenuItems] = useState([]);
const [currentMenuItem, setCurrentMenuItem] = useState({
    "itemName": '',
    "itemCategory": '',
    "itemPrice": 0
    })

function fetchMenuCategories() {
    FirestoreService.getAllMenuCategories().then((response) => {
    setMenuCategories(response._delegate._snapshot.docChanges);
    }).catch((e) => {
    alert("Error occured while fetching the menu categories. " + e);
    })
    }
    function fetchMenuItems() {
    FirestoreService.getAllMenuItems().then((response) => 
    setMenuItems(response._delegate._snapshot.docChanges);
    }).catch((e) => {
    alert("Error occured while fetching the menu item. " + e);
    });
    }
    useEffect(() => {
      if (user !== null) {
        if (menuCategories.length <= 0) {
          fetchMenuCategories();
        }
      fetchMenuItems();
    }}, [user])

const handleModalClose = () => {
setShowAddEditForm(false);
}
const handleAddEditFormSubmit = (e) => {
    e.preventDefault();
    const { itemName, itemCategory, itemPrice } = e.target.elements;
    if (itemPrice.value && itemName.value) {
       if (addEditFormType === "Add") {
          FirestoreService.AddNewMenuItem(itemName.value, itemCategory.value, itemPrice.value).then(() => {
          alert(`${itemName.value} is successfully added to the menu.`)
          setCurrentMenuItem({ "itemName": '', "itemCategory": '', "itemPrice": 0 })
          handleModalClose();
          window.location.reload(false);
          
  }).catch((e) => {
    alert("Error occured: " + e.message);
  })
  }
  else if (addEditFormType === "Edit") {FirestoreService.UpateMenuItem(currentMenuItemId, itemName.value, itemCategory.value, itemPrice.value).then(() => {
    alert(`${itemName.value} is successfully updated.`);
    setCurrentMenuItemId("");
    setCurrentMenuItem({ "itemName": '', "itemCategory": '', "itemPrice": 0 })
    handleModalClose();
    window.location.reload(false);
    }).catch((e) => {
    alert("Error occured: " + e.message);
    })
    }}
  setValidated(true)
  }

const [user, setUser] = useState(null);
firebase.auth().onAuthStateChanged((user) => {
if (user) {
setUser(user);
} else {
setUser(null);
}
})

return (
<>
<h1>You're not logged in. Please <a href="/login">login</a> first then come to dashboard.</h1>
{(user === null) && <NotLoggedInView />}
{(user !== null) && <></>
{/* Add/Edit Form START */}
<Modal show={showAddEditForm} onHide={handleModalClose}>
<Form noValidate validated={validated} onSubmit={handleAddEditFormSubmit}>
<Modal.Header>
<Modal.Title>{(addEditFormType === 'Add') ? 'Add Menu Item' : 'Edit'}</Modal.Title>
</Modal.Header>
<Modal.Body>
<FloatingLabel controlId="itemCategory" label="Item Category" className="mb-3" >
<Form.Select>
{(menuCategories) && (menuCategories.map((menuCategory, index) => (
<option key={index} value={menuCategory.doc.data.value.mapValue.fields.catName.stringValue}>
{menuCategory.doc.data.value.mapValue.fields.catName.stringValue}</option>
)))}
</Form.Select>
</FloatingLabel>
<FloatingLabel controlId="itemPrice" label="Price" className="mb-3" >
<Form.Control required type='text' placeholder='Enter item price' size='md' />
<Form.Control.Feedback type='invalid'>Item Price is required</Form.Control.Feedback>
</FloatingLabel>
<Modal.Body>
<FloatingLabel controlId="itemName" label="Item Name" className="mb-3" >
<Form.Control required type='text' placeholder='Enter item name' size='md' value={currentMenuItem?.itemName} onChange={(e) => {
setCurrentMenuItem({
"itemName": (e.target.value) ? e.target.value : '',
"itemCategory": currentMenuItem?.itemCategory,
"itemPrice": currentMenuItem?.itemPrice
})
}} />
<Form.Control.Feedback type='invalid'>Item name is required</Form.Control.Feedback>
</FloatingLabel>
<FloatingLabel controlId="itemCategory" label="Item Category" className="mb-3" >
<Form.Select value={currentMenuItem?.itemCategory} onChange={(e) => {
setCurrentMenuItem({
"itemName": currentMenuItem?.itemName,
"itemCategory": e.target.value,
"itemPrice": currentMenuItem?.itemPrice
})
}}>
{(menuCategories) && (menuCategories.map((menuCategory, index) => (<option key={index} value={menuCategory.doc.data.value.mapValue.fields.catName.stringValue}>
<option key={index} value={menuCategory.doc.data.value.mapValue.fields.catName.stringValue}>
{menuCategory.doc.data.value.mapValue.fields.catName.stringValue}
</option>
)))}
</Form.Select>
</FloatingLabel>
<FloatingLabel controlId="itemPrice" label="Price (MYR)" className="mb-3">
<Form.Control required type='text' placeholder='Enter item price' size='md' value={currentMenuItem?.itemPrice} onChange={(e) => {
setCurrentMenuItem({
"itemName": currentMenuItem?.itemName,
"itemCategory": currentMenuItem?.itemCategory,
"itemPrice": e.target.value)
})
}} />
<Form.Control.Feedback type='invalid'>Item Price is required</Form.Control.Feedback>
</FloatingLabel>
</Modal.Body>
//... other UI elements as it is and then we need to update the Add New Item button
<Button style={{ backgroundColor: '#000', borderWidth: 0, }} onClick={() => {
setShowAddEditForm(true);
}}>Add New Item</Button>
</Card.Header>
<Card.Body>
<Table responsive>
<thead>
<tr>
<th>#</th>
<th>Item Name</th>
<th>Category</th>
<th>Price (USD)</th>
<th></th>
</tr>
</thead>
<tbody>
{(menuItems) && (menuItems.map((menuItem, index) => (
<tr key={index}>
<td>{index + 1}</td>
<td>{menuItem.doc.data.value.mapValue.fields.itemName.stringValue}</td>
<td>{menuItem.doc.data.value.mapValue.fields.itemCategory.stringValue}</td>
<td>{menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue ? menuItem.doc.data.value.mapValue.fields.itemPrice.doubleValue : menuItem.doc.data.value.mapValue.fields.itemPrice.integerValue}</td>
<td>
<Button variant='primary' onClick={() => {
alert("Edit functionality coming soon")
}}>✎ Edit</Button>{' '}
<Button variant='danger' onClick={() => {
alert("Delete functionality coming soon")
}}>x Delete</Button>
</td>
</tr>
)))}
</tbody>
</Table>
</Card.Body>
<Card.Footer className="d-flex justify-content-between align-items-center">
<p style={{ marginTop: 8, fontSize: 12, color: '#A1A1A1' }}>Nandos Menu v1.0.0 - <a href="/login">Logout</a></p>
</Card.Footer>
</Card>
</>
);
}
export default Dashboard;