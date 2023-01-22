/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";

// reactstrap components
import {
	// eslint-disable-next-line no-unused-vars
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Container,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Alert,
	Spinner,
	Label,
	Col,
	Modal,
	ModalBody,
} from "reactstrap";
import { produce } from "immer";
import { generate } from "shortid";
import axios from "axios";
import history from "history.js";
import { toast } from "react-toastify";
import Select from "components/general/Select/AnimatedSelect";

const CarDataFormModalView = (match) => {
	const [data, setData] = useState({
		name: "",
		lastname: "",
		personalnumber: "",
		cellphone: "",
		typevent: "",
		resevent: "",
		yn: "",
		status: "",
		selneshek: "",
		whap: "",
		amlahtype: "",
		rekemtype: "",
		mazavrekem: "",
		dwork: "",
		mataftype: "",
		apitype: "",
		mholaztype: "",
		pirot: "",
		datevent: "",
		mikom: "",
		nifga: "",

		error: false,
		successmsg: false,
		loading: false,
		redirectToReferrer: false,
		//
	});
	const [cardata, setCarData] = useState({});
	const [gdods, setGdods] = useState([]);
	const [hativas, setHativas] = useState([]);
	const [ogdas, setOgdas] = useState([]);
	const [pikods, setPikods] = useState([]);
	const [mkabazsMataf, setMkabazsMataf] = useState([]);
	const [indexM, setIndexM] = useState(0);

	const [mkabazs, setMkabazs] = useState([]);
	const [magads, setMagads] = useState([]);
	const [magadals, setMagadals] = useState([]);

	const loadcardata = async () => {
		await axios
			.get(`http://localhost:8000/api/cardata/${match.cardataid}`)
			.then((response) => {
				let tempcardata = response.data[0];
				if (tempcardata.latest_recalibration_date)
					tempcardata.latest_recalibration_date =
						tempcardata.latest_recalibration_date.slice(0, 10);
				setCarData(tempcardata);
				// ? setFinalSpecialKeytwo(tempcardata.tipuls);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const fixnewcardataunitsbyunittype = async () => {
		let tempcardata = {};
		if (match.unittype == "pikod") {
			tempcardata.pikod = match.unitid;
		} else if (match.unittype == "ogda") {
			tempcardata.ogda = match.unitid;
			let response = await axios.get(
				`http://localhost:8000/api/ogda/${match.unitid}`
			);
			tempcardata.pikod = response.data.pikod;
		} else if (match.unittype == "hativa") {
			tempcardata.hativa = match.unitid;
			let response1 = await axios.get(
				`http://localhost:8000/api/hativa/${match.unitid}`
			);
			tempcardata.ogda = response1.data.ogda;
			let response = await axios.get(
				`http://localhost:8000/api/ogda/${tempcardata.ogda}`
			);
			tempcardata.pikod = response.data.pikod;
		} else if (match.unittype == "gdod") {
			tempcardata.gdod = match.unitid;
			let response2 = await axios.get(
				`http://localhost:8000/api/gdod/${match.unitid}`
			);
			tempcardata.hativa = response2.data.hativa;
			let response1 = await axios.get(
				`http://localhost:8000/api/hativa/${tempcardata.hativa}`
			);
			tempcardata.ogda = response1.data.ogda;
			let response = await axios.get(
				`http://localhost:8000/api/ogda/${tempcardata.ogda}`
			);
			tempcardata.pikod = response.data.pikod;
		}
		setCarData(tempcardata);
	};

	const getMagadals = async () => {
		await axios
			.get(`http://localhost:8000/api/magadal`)
			.then((response) => {
				setMagadals(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getMagads = async (magadalid) => {
		let tempmagadalsmagads = [];
		if (magadalid != undefined) {
			await axios
				.get(`http://localhost:8000/api/magad/magadsbymagadal/${magadalid}`)
				.then((response) => {
					for (let j = 0; j < response.data.length; j++)
						tempmagadalsmagads.push(response.data[j]);
				})
				.catch((error) => {
					console.log(error);
				});
			setMagads(tempmagadalsmagads);
		}
	};

	const getMkabazs = async (magadid) => {
		let tempmagadmkabazs = [];
		if (magadid != undefined) {
			await axios
				.get(`http://localhost:8000/api/mkabaz/mkabazsbymagad/${magadid}`)
				.then((response) => {
					for (let j = 0; j < response.data.length; j++)
						tempmagadmkabazs.push(response.data[j]);
				})
				.catch((error) => {
					console.log(error);
				});
			setMkabazs(tempmagadmkabazs);
		}
	};

	const getMkabazsMataf = async () => {
		await axios
			.get(`http://localhost:8000/api/mkabaz`)
			.then((response) => {
				setMkabazsMataf(response.data);
				// console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadPikods = async () => {
		await axios
			.get("http://localhost:8000/api/pikod")
			.then((response) => {
				setPikods(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadOgdas = async (pikodids) => {
		let temppikodids = pikodids;
		if (temppikodids != undefined && !temppikodids.isArray) {
			temppikodids = [pikodids];
		}
		let temppikodsogdas = [];
		if (temppikodids != undefined && temppikodids.length > 0) {
			for (let i = 0; i < temppikodids.length; i++) {
				await axios
					.post("http://localhost:8000/api/ogda/ogdasbypikodid", {
						pikod: temppikodids[i],
					})
					.then((response) => {
						for (let j = 0; j < response.data.length; j++)
							temppikodsogdas.push(response.data[j]);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		setOgdas(temppikodsogdas);
	};

	const loadHativas = async (ogdaids) => {
		let tempogdaids = ogdaids;
		if (tempogdaids != undefined && !tempogdaids.isArray) {
			tempogdaids = [ogdaids];
		}
		let tempogdashativas = [];
		if (tempogdaids != undefined && tempogdaids.length > 0) {
			for (let i = 0; i < tempogdaids.length; i++) {
				await axios
					.post("http://localhost:8000/api/hativa/hativasbyogdaid", {
						ogda: tempogdaids[i],
					})
					.then((response) => {
						for (let j = 0; j < response.data.length; j++)
							tempogdashativas.push(response.data[j]);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		setHativas(tempogdashativas);
	};

	const loadGdods = async (hativaids) => {
		let temphativaids = hativaids;
		if (temphativaids != undefined && !temphativaids.isArray) {
			temphativaids = [hativaids];
		}
		let temphativasgdods = [];
		if (temphativaids != undefined && temphativaids.length > 0) {
			for (let i = 0; i < temphativaids.length; i++) {
				await axios
					.post("http://localhost:8000/api/gdod/gdodsbyhativaid", {
						hativa: temphativaids[i],
					})
					.then((response) => {
						for (let j = 0; j < response.data.length; j++)
							temphativasgdods.push(response.data[j]);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		setGdods(temphativasgdods);
	};

	function handleChange(evt) {
		const value = evt.target.value;
		setData({ ...data, [evt.target.name]: value });
	}

	async function matafHandleChange(selectedOption, name) {
		if (!(selectedOption.value == "בחר")) {
			let i = mkabazsMataf.map((item, index) => {
				return mkabazsMataf[index].name;
			});
			console.log(1);
			let nameIndex = await i.indexOf(selectedOption.label);
			// console.log(selectedOption.label);
			console.log(nameIndex);
			await setIndexM(nameIndex);
			// console.log(mkabazsMataf[nameIndex]);
			console.log(indexM);
			console.log(mkabazsMataf[indexM].matafEngine);
			console.log(mkabazsMataf[indexM].matafCre);

			setData({ ...data, [name]: selectedOption.value });
		} else {
			let tempdata = { ...data };
			console.log(tempdata);
			delete tempdata[name];
			setData(tempdata);
		}
	}

	function handleChange2(selectedOption, name) {
		if (!(selectedOption.value == "בחר"))
			setData({ ...data, [name]: selectedOption.value });
		else {
			let tempdata = { ...data };
			delete tempdata[name];
			setData(tempdata);
		}
	}
	const clickSubmit = (event) => {
		match.ToggleForModal();
	};

	const init = () => {
		if (match.cardataid != undefined) {
			loadcardata();
		} else {
			fixnewcardataunitsbyunittype();
		}
		getMagadals();
		loadPikods();
	};

	useEffect(() => {
		if (match.isOpen == true) init();
		else {
			setCarData({});
			// setFinalSpecialKeytwo([])
		}
	}, [match.isOpen]);

	useEffect(() => {
		setOgdas([]);
		loadOgdas(data.pikod);
	}, [data.pikod]);

	useEffect(() => {
		setHativas([]);
		loadHativas(data.ogda);
	}, [data.ogda]);

	useEffect(() => {
		setGdods([]);
		loadGdods(data.hativa);
	}, [data.hativa]);

	useEffect(() => {
		setMagads([]);
		getMagads(data.magadal);
	}, [data.magadal]);

	useEffect(() => {
		setMkabazs([]);
		getMkabazs(data.magad);
	}, [data.magad]);

	useEffect(() => {
		setMkabazsMataf([]);
		getMkabazsMataf();
	}, [data.mkabaz]);

	// todo: add a way to get the mkbatz

	return (
		<Modal
			style={{
				minHeight: "100%",
				maxHeight: "100%",
				minWidth: "80%",
				maxWidth: "80%",
				justifyContent: "center",
				alignSelf: "center",
			}}
			isOpen={match.isOpen}
			centered
			fullscreen
			scrollable
			size=""
			toggle={match.Toggle}
		>
			<ModalBody>
				<Card>
					<CardHeader style={{ direction: "rtl" }}>
						<CardTitle
							tag="h4"
							style={{
								direction: "rtl",
								textAlign: "center",
								fontWeight: "bold",
							}}
						>
							צפייה בדיווח{" "}
						</CardTitle>
						{/*headline*/}
					</CardHeader>
					<CardBody style={{ direction: "rtl" }}>
						<div>
							<Container className="mt--8 pb-5">
								<Row className="justify-content-center">
									<Col
										lg="20"
										md="7"
									>
										<Card className="shadow border-0">
											{data.typevent != "רק'ם" ? (
												<CardBody className="px-lg-5 py-lg-5">
													<div className="text-center text-muted mb-4">
														<big>עדכון דיווח</big>
													</div>
													<div className="text-center text-muted mb-4">
														<small>פרטי מדווח</small>
													</div>
													<Form role="form">
														<FormGroup dir="rtl">
															<Input
																placeholder="שם פרטי"
																name="name"
																type="text"
																value={data.name}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<FormGroup dir="rtl">
															<Input
																placeholder="שם משפחה"
																name="lastname"
																type="text"
																value={data.lastname}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<FormGroup
															className="mb-3"
															dir="rtl"
														>
															<Input
																placeholder="מספר אישי"
																name="personalnumber"
																type="string"
																maxlength="7"
																value={data.personalnumber}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<FormGroup
															className="mb-3"
															dir="rtl"
														>
															<Input
																placeholder="טלפון נייד"
																name="cellphone"
																type="tel"
																maxlength="10"
																value={data.cellphone}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<div className="text-center text-muted mb-4">
															<small>פרטי יחידה מדווחת</small>
														</div>

														<Row style={{ paddingTop: "2px" }}>
															{!data.ogda ? (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>פיקוד</h6>
																	<Select
																		data={pikods}
																		handleChange2={handleChange2}
																		name={"pikod"}
																		val={data.pikod ? data.pikod : undefined}
																		isDisabled={true}
																	/>
																</Col>
															) : (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>פיקוד</h6>
																	<Select
																		disabled
																		data={pikods}
																		handleChange2={handleChange2}
																		name={"pikod"}
																		val={data.pikod ? data.pikod : undefined}
																		isDisabled={true}
																	/>
																</Col>
															)}

															<>
																{data.pikod && !data.hativa ? (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>אוגדה</h6>
																		<Select
																			data={ogdas}
																			handleChange2={handleChange2}
																			name={"ogda"}
																			val={data.ogda ? data.ogda : undefined}
																			isDisabled={true}
																		/>
																	</Col>
																) : (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>אוגדה</h6>
																		<Select
																			data={ogdas}
																			handleChange2={handleChange2}
																			name={"ogda"}
																			val={data.ogda ? data.ogda : undefined}
																			isDisabled={true}
																		/>
																	</Col>
																)}
															</>

															<>
																{data.ogda && !data.gdod ? (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>חטיבה</h6>
																		<Select
																			data={hativas}
																			handleChange2={handleChange2}
																			name={"hativa"}
																			val={
																				data.hativa ? data.hativa : undefined
																			}
																			isDisabled={true}
																		/>
																	</Col>
																) : (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>חטיבה</h6>
																		<Select
																			data={hativas}
																			handleChange2={handleChange2}
																			name={"hativa"}
																			val={
																				data.hativa ? data.hativa : undefined
																			}
																			isDisabled={true}
																		/>
																	</Col>
																)}
															</>

															<>
																{data.hativa ? (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>גדוד</h6>
																		<Select
																			data={gdods}
																			handleChange2={handleChange2}
																			name={"gdod"}
																			val={data.gdod ? data.gdod : undefined}
																			isDisabled={true}
																		/>
																	</Col>
																) : (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>גדוד</h6>
																		<Select
																			data={gdods}
																			handleChange2={handleChange2}
																			name={"gdod"}
																			val={data.gdod ? data.gdod : undefined}
																			isDisabled={true}
																		/>
																	</Col>
																)}
															</>
														</Row>

														<div
															className="text-center text-muted mb-4"
															style={{ paddingTop: "20px" }}
														>
															<small>פרטי אירוע</small>
														</div>

														<div
															style={{ textAlign: "right", paddingTop: "10px" }}
														>
															סוג אירוע
														</div>
														<FormGroup>
															<Input
																placeholder="סוג אירוע"
																type="select"
																name="typevent"
																value={data.typevent}
																onChange={handleChange}
																id="seltype"
																disabled
															>
																<option value={"בחר"}>בחר</option>
																<option value={"1"}>תאונת כלי רכב</option>
																<option value={"2"}>התהפכות</option>
																<option value={"3"}>הנתקות גלגל</option>
																<option value={"4"}>שריפה</option>
																<option value={"5"}>אירועי נשק / תחמושת</option>
																<option value={"6"}>
																	תאונת עבודה אנשי טנ"א
																</option>
																<option value={"7"}>פריקת מטפים</option>
																<option value={"8"}>אפידמיה</option>
																<option value={"9"}>חילוץ</option>
																<option value={"10"}>
																	נזק לתשתיות אחזקה / הח"י
																</option>
																<option value={"11"}>אי קיום שגרת אחזקה</option>
																<option value={"12"}>אחר</option>
															</Input>
														</FormGroup>

														{/* תאונת כלי רכב, שריפה, הנתקות גלגל,התהפכות */}

														{(data.typevent === "1" ||
															data.typevent === "2" ||
															data.typevent === "3" ||
															data.typevent === "4") && (
															<>
																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	סיבת האירוע
																</div>
																<FormGroup>
																	<Input
																		type="select"
																		name="resevent"
																		value={data.resevent}
																		onChange={handleChange}
																		id="res"
																		disabled
																	>
																		<option value={"0"}>בחר</option>
																		<option value={"1"}>תאונה</option>
																		<option value={"2"}>כשל טכני</option>
																		<option value={"3"}>טעות אנוש</option>
																		<option value={"4"}>לא ידוע</option>
																	</Input>
																</FormGroup>

																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	סוג הכלי
																</div>
																<Row>
																	{!data.magad ? (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד על</h6>
																			<Select
																				data={magadals}
																				handleChange2={handleChange2}
																				name={"magadal"}
																				val={
																					data.magadal
																						? data.magadal
																						: undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	) : (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד על</h6>
																			<Select
																				data={magadals}
																				handleChange2={handleChange2}
																				name={"magadal"}
																				val={
																					data.magadal
																						? data.magadal
																						: undefined
																				}
																				disabled
																			/>
																		</Col>
																	)}

																	{data.magadal && !data.mkabaz ? (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד</h6>
																			<Select
																				data={magads}
																				handleChange2={handleChange2}
																				name={"magad"}
																				val={
																					data.magad ? data.magad : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	) : (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד</h6>
																			<Select
																				data={magads}
																				handleChange2={handleChange2}
																				name={"magad"}
																				val={
																					data.magad ? data.magad : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	)}

																	{data.magad && !data.makat ? (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מקבץ</h6>
																			<Select
																				data={mkabazs}
																				handleChange2={handleChange2}
																				name={"mkabaz"}
																				val={
																					data.mkabaz ? data.mkabaz : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	) : (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מקבץ</h6>
																			<Select
																				data={mkabazs}
																				handleChange2={handleChange2}
																				name={"mkabaz"}
																				val={
																					data.mkabaz ? data.mkabaz : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	)}
																</Row>

																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	האם נגרם נזק לכלי
																</div>
																<div style={{ textAlign: "right" }}>
																	<FormGroup
																		check
																		inline
																	>
																		<div
																			style={{
																				textAlign: "right",
																				paddingTop: "10px",
																			}}
																		>
																			<Input
																				type="radio"
																				name="yn"
																				value={true}
																				onChange={handleChange}
																				id="YES"
																				disabled
																			/>
																			כן
																		</div>
																	</FormGroup>

																	<FormGroup
																		check
																		inline
																	>
																		<div
																			style={{
																				textAlign: "right",
																				paddingTop: "10px",
																			}}
																		>
																			<Input
																				type="radio"
																				id="NO"
																				name="yn"
																				value={false}
																				onChange={handleChange}
																				disabled
																			/>
																			לא
																		</div>
																	</FormGroup>
																</div>
															</>
														)}

														{/* אירוע נשק */}

														{data.typevent === "5" && (
															<>
																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	סוג הנשק
																</div>
																<FormGroup>
																	<Input
																		type="select"
																		name="selneshek"
																		value={data.selneshek}
																		onChange={handleChange}
																		id="neshek"
																		disabled
																	>
																		<option value={"0"}>בחר</option>
																	</Input>
																</FormGroup>

																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	האם נגרם נזק לנשק
																</div>

																<div style={{ textAlign: "right" }}>
																	<FormGroup
																		check
																		inline
																	>
																		<div
																			style={{
																				textAlign: "right",
																				paddingTop: "10px",
																			}}
																		>
																			<Input
																				type="radio"
																				name="yn"
																				value={true}
																				onChange={handleChange}
																				id="YES"
																				disabled
																			/>
																			כן
																		</div>
																	</FormGroup>

																	<FormGroup
																		check
																		inline
																	>
																		<div
																			style={{
																				textAlign: "right",
																				paddingTop: "10px",
																			}}
																		>
																			<Input
																				type="radio"
																				id="NO"
																				name="yn"
																				value={false}
																				onChange={handleChange}
																				disabled
																			/>
																			לא
																		</div>
																	</FormGroup>
																</div>

																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	מה התרחש באירוע
																</div>
																<FormGroup>
																	<Input
																		type="select"
																		name="whap"
																		value={data.whap}
																		onChange={handleChange}
																		id="what"
																		disabled
																	>
																		<option value={"0"}>בחר</option>
																		<option value={"1"}>פיצוץ נשק</option>
																		<option value={"2"}>פיצוץ תחמושת</option>
																		<option value={"3"}>פליטת כדור</option>
																		<option value={"4"}>גרימת נזק לנשק</option>
																		<option value={"5"}>אחר</option>
																	</Input>
																</FormGroup>
															</>
														)}

														{/*  תאונת עבודה אנשי טנ"א */}

														{data.typevent === "6" && (
															<>
																<p
																	style={{
																		textAlign: "right",
																		color: "red",
																		fontSize: "10px",
																	}}
																>
																	{" "}
																	*תאונת עבודה - כל אירוע בו קיים ימי מחלה (מיום
																	מחלה אחד ומעלה)
																</p>

																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	מתי נפגע
																</div>
																<FormGroup>
																	<Input
																		type="select"
																		name="wnifga"
																		value={data.wnifga}
																		onChange={handleChange}
																		id="when"
																		disabled
																	>
																		<option value={"0"}>בחר</option>
																		<option value={"1"}>
																			במהלך פעילות אחזקתית
																		</option>
																		<option value={"2"}>
																			במהלך פעילות שגרתית
																		</option>
																		<option value={"3"}>תרגיל</option>
																		<option value={"4"}>פעילות מבצעית</option>
																		<option value={"5"}>אחר</option>
																	</Input>
																</FormGroup>

																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	ממה נפגע
																</div>
																<FormGroup>
																	<Input
																		type="text"
																		name="amlahtype"
																		value={data.amlahtype}
																		onChange={handleChange}
																		id="amlah"
																		disabled
																	></Input>
																</FormGroup>
															</>
														)}

														{/* פריקת מטפים*/}

														{/*//* ------- פריקת מטפים ------------------*/}

														{data.typevent === "7" && (
															<>
																<Row>
																	{!data.magad ? (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד על</h6>
																			<Select
																				data={magadals}
																				handleChange2={handleChange2}
																				name={"magadal"}
																				val={
																					data.magadal
																						? data.magadal
																						: undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	) : (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד על</h6>
																			<Select
																				data={magadals}
																				handleChange2={handleChange2}
																				name={"magadal"}
																				val={
																					data.magadal
																						? data.magadal
																						: undefined
																				}
																				disabled
																			/>
																		</Col>
																	)}

																	{data.magadal && !data.mkabaz ? (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד</h6>
																			<Select
																				data={magads}
																				handleChange2={handleChange2}
																				name={"magad"}
																				val={
																					data.magad ? data.magad : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	) : (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד</h6>
																			<Select
																				data={magads}
																				handleChange2={handleChange2}
																				name={"magad"}
																				val={
																					data.magad ? data.magad : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	)}

																	{data.magad && !data.makat ? (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מקבץ</h6>
																			<Select
																				data={mkabazs}
																				handleChange2={handleChange2}
																				name={"mkabaz"}
																				val={
																					data.mkabaz ? data.mkabaz : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	) : (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מקבץ</h6>
																			<Select
																				data={mkabazs}
																				handleChange2={handleChange2}
																				name={"mkabaz"}
																				val={
																					data.mkabaz ? data.mkabaz : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	)}
																</Row>
																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	סוג המטף
																</div>
																<FormGroup>
																	{/* {console.log(mkabazsMataf)} */}
																	{/* {console.log(mkabazsMataf[indexM])}
												{console.log(mkabazsMataf[indexM].matafEngine)}
												{console.log(mkabazsMataf[indexM].matafCre)} */}

																	{mkabazsMataf[indexM] ==
																	undefined ? null : mkabazsMataf[indexM]
																			.matafEngine &&
																	  mkabazsMataf[indexM].matafCre ? (
																		<Input
																			type="select"
																			name="mataftype"
																			value={data.mataftype}
																			onChange={handleChange}
																			id="mataf"
																			disabled
																		>
																			<option value={"0"}>בחר</option>
																			<option value={"1"}>תא מנוע</option>
																			<option value={"2"}>תא צוות</option>
																			<option value={"3"}>
																				תא מנוע ותא צוות
																			</option>
																		</Input>
																	) : mkabazsMataf[indexM].matafEngine ? (
																		<Input
																			type="select"
																			name="mataftype"
																			value={data.mataftype}
																			onChange={handleChange}
																			id="mataf"
																			disabled
																		>
																			<option value={"0"}>בחר</option>
																			<option value={"1"}>תא מנוע</option>
																		</Input>
																	) : mkabazsMataf[indexM].matafCre ? (
																		<Input
																			type="select"
																			name="mataftype"
																			value={data.mataftype}
																			onChange={handleChange}
																			id="mataf"
																			disabled
																		>
																			<option value={"0"}>בחר</option>
																			<option value={"2"}>תא צוות</option>
																		</Input>
																	) : (
																		<Input
																			type="select"
																			name="mataftype"
																			value={data.mataftype}
																			onChange={handleChange}
																			id="mataf"
																			disabled
																		>
																			<option value={"0"}>בחר</option>
																			<option value={""}>לא נמצאו כלים </option>
																		</Input>
																	)}
																</FormGroup>

																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	מצב הרק"ם במהלך הפריקה
																</div>
																<FormGroup>
																	<Input
																		type="select"
																		name="mazavrekem"
																		value={data.mazavrekem}
																		onChange={handleChange}
																		id="mazav"
																		disabled
																	>
																		<option value={"0"}>בחר</option>
																		<option value={"1"}>סטטי</option>
																		<option value={"2"}>בתנועה</option>
																	</Input>
																</FormGroup>

																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	האם בוצע במהלך עבודה
																</div>
																<FormGroup>
																	<Input
																		type="select"
																		name="dwork"
																		value={data.dwork}
																		onChange={handleChange}
																		id="dwork"
																		disabled
																	>
																		<option value={"0"}>בחר</option>
																		<option value={"1"}>אחזקתית טנ"א</option>
																		<option value={"2"}>תקשוב</option>
																	</Input>
																</FormGroup>

																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	במהלך פירוק / הרכבה
																</div>

																<div style={{ textAlign: "right" }}>
																	<FormGroup
																		check
																		inline
																	>
																		<div
																			style={{
																				textAlign: "right",
																				paddingTop: "10px",
																			}}
																		>
																			<Input
																				type="radio"
																				name="yn"
																				value={true}
																				onChange={handleChange}
																				id="YES"
																				disabled
																			/>
																			כן
																		</div>
																	</FormGroup>

																	<FormGroup
																		check
																		inline
																	>
																		<div
																			style={{
																				textAlign: "right",
																				paddingTop: "10px",
																			}}
																		>
																			<Input
																				type="radio"
																				id="NO"
																				name="yn"
																				value={false}
																				onChange={handleChange}
																				disabled
																			/>
																			לא
																		</div>
																	</FormGroup>
																</div>
															</>
														)}

														{/* אפידמיה */}

														{data.typevent === "8" && (
															<>
																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	סוג האפידמיה
																</div>
																<FormGroup>
																	<Input
																		type="select"
																		name="apitype"
																		value={data.apitype}
																		onChange={handleChange}
																		id="apidmia"
																		disabled
																	>
																		<option value={"0"}>בחר</option>
																		<option value={"1"}>תפעולית</option>
																		<option value={"2"}>אחזקתית</option>
																	</Input>
																</FormGroup>
															</>
														)}

														{/*//* -------------- חילוץ  ----------*/}

														{data.typevent === "9" && (
															<>
																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	סוג הכלי המחולץ
																</div>
																<Row>
																	{!data.magad ? (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד על</h6>
																			<Select
																				data={magadals}
																				handleChange2={handleChange2}
																				name={"magadal"}
																				val={
																					data.magadal
																						? data.magadal
																						: undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	) : (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד על</h6>
																			<Select
																				data={magadals}
																				handleChange2={handleChange2}
																				name={"magadal"}
																				val={
																					data.magadal
																						? data.magadal
																						: undefined
																				}
																				disabled
																			/>
																		</Col>
																	)}

																	{data.magadal && !data.mkabaz ? (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד</h6>
																			<Select
																				data={magads}
																				handleChange2={handleChange2}
																				name={"magad"}
																				val={
																					data.magad ? data.magad : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	) : (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מאגד</h6>
																			<Select
																				data={magads}
																				handleChange2={handleChange2}
																				name={"magad"}
																				val={
																					data.magad ? data.magad : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	)}

																	{data.magad && !data.makat ? (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מקבץ</h6>
																			<Select
																				data={mkabazs}
																				handleChange2={handleChange2}
																				name={"mkabaz"}
																				val={
																					data.mkabaz ? data.mkabaz : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	) : (
																		<Col
																			style={{
																				justifyContent: "right",
																				alignContent: "right",
																				textAlign: "right",
																			}}
																		>
																			<h6>מקבץ</h6>
																			<Select
																				data={mkabazs}
																				handleChange2={handleChange2}
																				name={"mkabaz"}
																				val={
																					data.mkabaz ? data.mkabaz : undefined
																				}
																				isDisabled={true}
																			/>
																		</Col>
																	)}
																</Row>
																{/* <div style={{ textAlign: "right", paddingTop: "10px" }}>
        סוג הכלי המחלץ
      </div>
     <FormGroup>
        <Input
          type="select"
          name="mhalztype"
          value={data.mhalztype}
          onChange={handleChange}
          id="mhalz"
        >
          <option value={"0"}>בחר</option>
        </Input>
      </FormGroup>
*/}
															</>
														)}
														{/*//* ------------- status checker ------------------ */}
														<div
															style={{ textAlign: "right", paddingTop: "10px" }}
														>
															סטטוס
														</div>
														<div style={{ textAlign: "right" }}>
															<FormGroup
																check
																inline
															>
																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	<Input
																		type="radio"
																		name="dt"
																		value="1"
																		onChange={handleChange}
																		id="delt"
																		disabled
																	/>
																	סגור
																</div>
															</FormGroup>

															<FormGroup
																check
																inline
															>
																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	<Input
																		type="radio"
																		id="notDelt"
																		name="dt"
																		value="0"
																		onChange={handleChange}
																		disabled
																	/>
																	בטיפול
																</div>
															</FormGroup>
														</div>

														<FormGroup dir="rtl">
															<Input
																placeholder="פירוט האירוע"
																name="pirot"
																type="textarea"
																value={data.pirot}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<div
															style={{ textAlign: "right", paddingTop: "10px" }}
														>
															תאריך אירוע
														</div>
														<FormGroup dir="rtl">
															<Input
																placeholder="תאריך אירוע"
																name="datevent"
																type="datetime-local"
																value={data.datevent.slice(0, 21)}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<FormGroup dir="rtl">
															<Input
																placeholder="מיקום האירוע"
																name="mikom"
																type="string"
																value={data.mikom}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<FormGroup dir="rtl">
															<Input
																placeholder="כמה נפגעים היו באירוע"
																name="nifga"
																type="number"
																value={data.nifga}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>
														{/* 
       {data.nifga > "0" && (
        <>
          <div style={{ textAlign: "right", paddingTop: "10px" }}>
            מצב הנפגע
          </div>
          <FormGroup>
            <Input
              type="select"
              name="mazavnifga"
              value={data.mazavnifga}
              onChange={handleChange}
              id="mazav"
            >
              <option value={"0"}>בחר</option>
              <option value={"1"}>קל</option>
              <option value={"2"}>בינוני</option>
              <option value={"3"}>קשה</option>
              <option value={"4"}>נהרג</option>
            </Input>
          </FormGroup>
          <FormGroup dir="rtl">
        <Input
          placeholder="מיקום הפגיעה בגוף"
          name="mikompgia"
          type="string"
          value={data.mikompgia}
          onChange={handleChange}
        />
      </FormGroup> 
      <div style={{ textAlign: 'right', paddingTop: '10px' }}>
      <button
    //    onClick={clickSubmit} 
       className="btn btn-primary">
          +
     </button>
     </div>
      </>
      )} */}
													</Form>
												</CardBody>
											) : (
												<CardBody className="px-lg-5 py-lg-5">
													<div className="text-center text-muted mb-4">
														<big>עיכון דיווח</big>
													</div>
													<div className="text-center text-muted mb-4">
														<small>פרטי מדווח</small>
													</div>
													<Form role="form">
														<FormGroup dir="rtl">
															<Input
																placeholder="שם פרטי"
																name="name"
																type="text"
																value={data.name}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<FormGroup dir="rtl">
															<Input
																placeholder="שם משפחה"
																name="lastname"
																type="text"
																value={data.lastname}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<FormGroup
															className="mb-3"
															dir="rtl"
														>
															<Input
																placeholder="מספר אישי"
																name="personalnumber"
																type="string"
																maxlength="7"
																value={data.personalnumber}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<FormGroup
															className="mb-3"
															dir="rtl"
														>
															<Input
																placeholder="טלפון נייד"
																name="cellphone"
																type="tel"
																maxlength="10"
																value={data.cellphone}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<div className="text-center text-muted mb-4">
															<small>פרטי יחידה מדווחת</small>
														</div>

														<Row style={{ paddingTop: "2px" }}>
															{!data.ogda ? (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>פיקוד</h6>
																	<Select
																		data={pikods}
																		handleChange2={handleChange2}
																		name={"pikod"}
																		val={data.pikod ? data.pikod : undefined}
																		isDisabled={true}
																	/>
																</Col>
															) : (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>פיקוד</h6>
																	<Select
																		disabled
																		data={pikods}
																		handleChange2={handleChange2}
																		name={"pikod"}
																		val={data.pikod ? data.pikod : undefined}
																		isDisabled={true}
																	/>
																</Col>
															)}

															<>
																{data.pikod && !data.hativa ? (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>אוגדה</h6>
																		<Select
																			data={ogdas}
																			handleChange2={handleChange2}
																			name={"ogda"}
																			val={data.ogda ? data.ogda : undefined}
																			isDisabled={true}
																		/>
																	</Col>
																) : (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>אוגדה</h6>
																		<Select
																			data={ogdas}
																			handleChange2={handleChange2}
																			name={"ogda"}
																			val={data.ogda ? data.ogda : undefined}
																			isDisabled={true}
																		/>
																	</Col>
																)}
															</>

															<>
																{data.ogda && !data.gdod ? (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>חטיבה</h6>
																		<Select
																			data={hativas}
																			handleChange2={handleChange2}
																			name={"hativa"}
																			val={
																				data.hativa ? data.hativa : undefined
																			}
																			isDisabled={true}
																		/>
																	</Col>
																) : (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>חטיבה</h6>
																		<Select
																			data={hativas}
																			handleChange2={handleChange2}
																			name={"hativa"}
																			val={
																				data.hativa ? data.hativa : undefined
																			}
																			isDisabled={true}
																		/>
																	</Col>
																)}
															</>

															<>
																{data.hativa ? (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>גדוד</h6>
																		<Select
																			data={gdods}
																			handleChange2={handleChange2}
																			name={"gdod"}
																			val={data.gdod ? data.gdod : undefined}
																			isDisabled={true}
																		/>
																	</Col>
																) : (
																	<Col
																		style={{
																			justifyContent: "right",
																			alignContent: "right",
																			textAlign: "right",
																		}}
																	>
																		<h6>גדוד</h6>
																		<Select
																			data={gdods}
																			handleChange2={handleChange2}
																			name={"gdod"}
																			val={data.gdod ? data.gdod : undefined}
																			isDisabled={true}
																		/>
																	</Col>
																)}
															</>
														</Row>

														<div
															className="text-center text-muted mb-4"
															style={{ paddingTop: "20px" }}
														>
															<small>פרטי אירוע</small>
														</div>

														<div
															style={{ textAlign: "right", paddingTop: "10px" }}
														>
															סיבת האירוע
														</div>
														<FormGroup>
															<Input
																type="select"
																name="resevent"
																value={data.resevent}
																onChange={handleChange}
																id="res"
																disabled
															>
																<option value={"0"}>בחר</option>
																<option value={"1"}>תאונה</option>
																<option value={"2"}>כשל טכני</option>
																<option value={"4"}>טעות אנוש</option>
																<option value={"3"}>לא ידוע</option>
															</Input>
														</FormGroup>

														<div
															style={{ textAlign: "right", paddingTop: "10px" }}
														>
															סוג הרק"ם
														</div>
														<Row>
															{!data.magad ? (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>מאגד על</h6>
																	<Select
																		data={magadals}
																		handleChange2={handleChange2}
																		name={"magadal"}
																		val={
																			data.magadal ? data.magadal : undefined
																		}
																		isDisabled={true}
																	/>
																</Col>
															) : (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>מאגד על</h6>
																	<Select
																		data={magadals}
																		handleChange2={handleChange2}
																		name={"magadal"}
																		val={
																			data.magadal ? data.magadal : undefined
																		}
																		disabled
																	/>
																</Col>
															)}

															{data.magadal && !data.mkabaz ? (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>מאגד</h6>
																	<Select
																		data={magads}
																		handleChange2={handleChange2}
																		name={"magad"}
																		val={data.magad ? data.magad : undefined}
																		isDisabled={true}
																	/>
																</Col>
															) : (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>מאגד</h6>
																	<Select
																		data={magads}
																		handleChange2={handleChange2}
																		name={"magad"}
																		val={data.magad ? data.magad : undefined}
																		isDisabled={true}
																	/>
																</Col>
															)}

															{data.magad && !data.makat ? (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>מקבץ</h6>
																	<Select
																		data={mkabazs}
																		handleChange2={handleChange2}
																		name={"mkabaz"}
																		val={data.mkabaz ? data.mkabaz : undefined}
																		isDisabled={true}
																	/>
																</Col>
															) : (
																<Col
																	style={{
																		justifyContent: "right",
																		alignContent: "right",
																		textAlign: "right",
																	}}
																>
																	<h6>מקבץ</h6>
																	<Select
																		data={mkabazs}
																		handleChange2={handleChange2}
																		name={"mkabaz"}
																		val={data.mkabaz ? data.mkabaz : undefined}
																		isDisabled={true}
																	/>
																</Col>
															)}
														</Row>

														<div
															style={{ textAlign: "right", paddingTop: "10px" }}
														>
															האם נגרם נזק לרק"ם
														</div>

														<div style={{ textAlign: "right" }}>
															<FormGroup
																check
																inline
															>
																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	<Input
																		type="radio"
																		name="yn"
																		value={true}
																		onChange={handleChange}
																		id="YES"
																		disabled
																	/>
																	כן
																</div>
															</FormGroup>

															<FormGroup
																check
																inline
															>
																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	<Input
																		type="radio"
																		id="NO"
																		name="yn"
																		value={false}
																		onChange={handleChange}
																		disabled
																	/>
																	לא
																</div>
															</FormGroup>
														</div>
														{/*//* ------------- status checker ------------------ */}
														<div
															style={{ textAlign: "right", paddingTop: "10px" }}
														>
															סטטוס
														</div>
														<div style={{ textAlign: "right" }}>
															<FormGroup
																check
																inline
															>
																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	<Input
																		type="radio"
																		name="dt"
																		value="1"
																		onChange={handleChange}
																		id="delt"
																		disabled
																	/>
																	סגור
																</div>
															</FormGroup>

															<FormGroup
																check
																inline
															>
																<div
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																	}}
																>
																	<Input
																		type="radio"
																		id="notDelt"
																		name="dt"
																		value="0"
																		onChange={handleChange}
																		disabled
																	/>
																	בטיפול
																</div>
															</FormGroup>
														</div>

														<FormGroup dir="rtl">
															<Input
																placeholder="פירוט האירוע"
																name="pirot"
																type="textarea"
																value={data.pirot}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<div
															style={{ textAlign: "right", paddingTop: "10px" }}
														>
															תאריך אירוע
														</div>
														<FormGroup dir="rtl">
															<Input
																placeholder="תאריך אירוע"
																name="datevent"
																type="datetime-local"
																value={data.datevent.slice(0, 21)}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<FormGroup dir="rtl">
															<Input
																placeholder="מיקום האירוע"
																name="mikom"
																type="string"
																value={data.mikom}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														<FormGroup dir="rtl">
															<Input
																placeholder="כמה נפגעים היו באירוע"
																name="nifga"
																type="number"
																value={data.nifga}
																onChange={handleChange}
																disabled
															/>
														</FormGroup>

														{/* {data.nifga > "0" && (
        <>
          <div style={{ textAlign: "right", paddingTop: "10px" }}>
            מצב הנפגע
          </div>
          <FormGroup>
            <Input
              type="select"
              name="mazavnifga"
              value={data.mazavnifga}
              onChange={handleChange}
              id="mazav"
            >
              <option value={"0"}>בחר</option>
              <option value={"1"}>קל</option>
              <option value={"2"}>בינוני</option>
              <option value={"3"}>קשה</option>
              <option value={"4"}>נהרג</option>
            </Input>
          </FormGroup>

          <FormGroup dir="rtl">
        <Input
          placeholder="מיקום הפגיעה בגוף"
          name="mikompgia"
          type="string"
          value={data.mikompgia}
          onChange={handleChange}
        />
      </FormGroup> 
      <div style={{ textAlign: 'right', paddingTop: '10px' }}>
      <button
      //  onClick={clickSubmit} 
       className="btn btn-primary">
          +
     </button>
     </div>
      </>
      )} */}
													</Form>
												</CardBody>
											)}

											<div className="text-center">
												<button
													onClick={clickSubmit}
													className="btn-new-blue mb-3"
												>
													צא
												</button>
											</div>
										</Card>
									</Col>
								</Row>
							</Container>
						</div>
					</CardBody>
				</Card>
			</ModalBody>
		</Modal>
	);
};
export default withRouter(CarDataFormModalView);
