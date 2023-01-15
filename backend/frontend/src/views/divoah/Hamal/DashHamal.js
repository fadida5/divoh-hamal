import React, { useState, useEffect } from "react";

import { Link, withRouter, Redirect } from "react-router-dom";
import {
	Button,
	Card,
	CardHeader,
	Container,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Col,
} from "reactstrap";
import axios from "axios";
import history from "history.js";
import { toast } from "react-toastify";

const AdminSignInForm = () => {
	const [reportDB, setReportDB] = useState([]);
	const [isError, setIsError] = useState(false);
	const eventTypeArray = {
		בחר: "",
		1: "תאונת כלי רכב",
		2: "התהפכות",
		3: "הנתקות גלגל",
		4: "שריפה",
		5: "אירוע נשק / תחמושת",
		6: 'תאונת עבודה אנשי טנ"א',
		7: "פריקת מטפים",
		8: "אפידמיה",
		9: "חילוץ",
		10: 'נזק לתשתיות אחזקה / הח"י',
		11: "אי קיום שגרת אחזקה",
		12: "אחר",
		"רק'ם": 'רק"ם',
	};
	useEffect(() => {
		axios
			.get(`http://localhost:8000/report/`)
			.then((response) => {
				console.log(response.data);
				setReportDB(response.data);
			})
			.catch((error) => {
				console.log(error);
				setIsError(true);
			});
	}, []);

	return (
		<div>
			<Container className="mt--8 pb-5">
				<Row>
					<Col lg="6">
						<Card className="card-chart">
							<CardHeader>
								<h3 className="card-category text-center">טבלאת אירועים</h3>
							</CardHeader>
							<CardBody>
								<table
									className="tablesorter"
									responsive
								>
									<thead className="text-primary">
										<tr>
											<th className="text-center">יחידה</th>
											<th className="text-center">סוג אירוע</th>
											<th className="text-center">פירוט האירוע</th>
										</tr>
									</thead>
									<tbody>
										{reportDB.map((report, index) => (
											<tr>
												<td>
													<p>{report.pirot}</p>
												</td>
												<td>{eventTypeArray[report.typevent]}</td>
												<td>{report.pirot}</td>
											</tr>
										))}
									</tbody>
								</table>
							</CardBody>
						</Card>
					</Col>
					<Col lg="6">
						<Row>
							<Col lg="12">
								<Card className="card-chart">
									<CardHeader>
										<h3 className="card-category text-center">
											{" "}
											אירועים לפי פיקוד
										</h3>
									</CardHeader>
									<CardBody>
										<h1>2</h1>
									</CardBody>
								</Card>
							</Col>
							<Col lg="12">
								<Card className="card-chart">
									<CardHeader>
										<h3 className="card-category text-center">
											{" "}
											אירועים לפי סוג אירוע
										</h3>
									</CardHeader>
									<CardBody>
										<h1>3</h1>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AdminSignInForm;
