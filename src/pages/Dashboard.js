import React, { useState, useEffect } from 'react';
import { Table, Card, Image, Button, Modal, Form, FloatingLabel } from 'react-bootstrap';
import NotLoggedInView from '../components/NoLoggedInView';

function Dashboard(props) {
const [showAddEditForm, setShowAddEditForm] = useState(false);
const [addEditFormType, setAddEditFormType] = useState('Add'); //Add, Edit
const [validated, setValidated] = useState(false);
const [menuItems, setMenuItems] = useState([]);
const [menuCategories, setMenuCategories] = useState([]);

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
    })
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
alert("Functionality Coming Soon");
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
</Modal.Body>
<Modal.Footer>
<Button type="submit">{(addEditFormType === 'Add') ? 'Add' : 'Update'}</Button>
</Modal.Footer>
</Form>
</Modal>
<Card style={{ margin: 24 }}>
<Card.Header className="d-flex justify-content-between align-items-center">
<div className="align-items-center" style={{ marginRight: 8 }}>
<Image src={'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Nandos_logo.svg/1200px-Nandos_logo.svg.png'} style={{ width: 80 }} />
<h4 style={{ marginTop: 8, }}>Dashboard</h4>
</div>
<Button style={{ backgroundColor: '#000', borderWidth: 0, }}>Add New Item</Button>
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