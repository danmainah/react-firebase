import React from 'react';
import { Table } from 'react-bootstrap';
function Menu(props) {
return (
<div>
<Table striped bordered hover variant="dark">
<thead>
<tr>
<th>#</th>
<th>Item Name</th>
<th>Category</th>
<th>Price (USD)</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>Cheessy Garlic Pita</td>
<td>Starters & Snacks</td>
<td>4</td>
</tr>
<tr>
<td>2</td>
<td>Hummus with  PERi-PERi Drizzle & Pita</td>
<td>Starters & Snacks</td>
<td>5.5</td>
</tr>
</tbody>
</Table>
</div>
);
}
export default Menu;