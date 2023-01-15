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
import { isAuthenticated } from "auth";

function AdminSignInForm() {
	const { user } = isAuthenticated();
	const [data, setData] = useState([]);

	useEffect(() => {
		console.log(user.personalnumber);
		if (user.role == "1") {
			history.push(`/dashamal`);
		}
		console.log(user.personalnumber);
		axios
			.get(
				`http://localhost:8000/report/requestByPersonalnumber/${user.personalnumber}`
			)
			.then((response) => {
				console.log(response.data);
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// console.log(data.length);
	// console.log(
	// 	data.map((i, index) => {
	// 		return data[index].typevent;
	// 	})
	// );

	const rekem = data.filter((i, index) => {
		if (isNaN(data[index].typevent)) {
			return data[index].typevent;
		}
	});
	const incident = data.filter((i, index) => {
		if (!isNaN(data[index].typevent)) {
			return data[index].typevent;
		}
	});
	console.log(rekem.length);
	console.log(incident.length);

	return (
		<div>
			<Container className="mt--8 pb-5">
				<Row className="justify-content-center">
					<Col
						lg="10"
						md="2"
					>
						<Card className="shadow border-0">
							<CardHeader>
								{" "}
								<h2 className="text-center">עשרת הדיברות בבטיחות בעבודה</h2>
							</CardHeader>
							<CardBody className="text-right mb-5">
								<li>
									{" "}
									t is a long established fact that a reader will be distracted
									by the readable content of a page when looking at its layout.
									The point of using Lorem Ipsum is that it has a more-or-less
									normal distribution of letters, as opposed to using 'Content
									here, content here', making it look like readable English.
									Many desktop publishing packages and web page editors now use
									Lorem Ipsum as their default model text, and a search for
									'lorem ipsum' will uncover many web sites still in their
									infancy . Various versions have evolved over the years,
									sometimes by accident, sometimes on purpose (injected humour
									and the like).
								</li>
								<li>
									{" "}
									t is a long established fact that a reader will be distracted
									by the readable content of a page when looking at its layout.
									The point of using Lorem Ipsum is that it has a more-or-less
									normal distribution of letters, as opposed to using 'Content
									here, content here', making it look like readable English.
									Many desktop publishing packages and web page editors now use
									Lorem Ipsum as their default model text, and a search for
									'lorem ipsum' will uncover many web sites still in their
									infancy . Various versions have evolved over the years,
									sometimes by accident, sometimes on purpose (injected humour
									and the like).
								</li>
							</CardBody>
							{/*//* ---------------- navigation buttons ----------------------------------------------------- */}
							<div className="row justify-content-around mb-4 mt-5">
								<div className="col-md-3 ">
									<Button>
										<Link
											className="text-white"
											to="/report"
										>
											דיווח אירוע חריג
										</Link>
									</Button>
								</div>
								<div className="col-md-3 ml-4">
									<Button>
										<Link
											className="text-white"
											to="/reportrekem"
										>
											דיווח אירוע רק"ם
										</Link>
									</Button>
								</div>
							</div>
						</Card>
					</Col>
					{/*//* ------------------------------------------------------------ info cards ---------------------------------   */}
					<div className="row justify-content-around">
						<Card className="col-md-4 shadow border-0 mt-5 ml-5">
							<CardHeader>
								{" "}
								<h2 className="text-center">
									כמות אירועים חריגים שדווחו <br />
									{incident.length}
								</h2>
							</CardHeader>
						</Card>
						<Card className="col-md-4 shadow border-0 mt-5 mr-5">
							<CardHeader>
								{" "}
								<h2 className="text-center">
									כמות אירועי רק"ם שדווחו
									<br /> {rekem.length}
								</h2>
							</CardHeader>
						</Card>
					</div>
				</Row>
			</Container>
		</div>
	);
}

export default AdminSignInForm;
