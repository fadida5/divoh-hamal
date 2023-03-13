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
import CarTypesFilterObjectRekem from "components/general/CarTypeFilter/CarTypesFilterObjectRekem";
import deletepic from "assets/img/delete.png";

const CarDataFormModalHatal = (match) => {
	const digits_only = (string) =>
		[...string].every((c) => "0123456789".includes(c));

	const [cartypesfilterarray, setCartypesfilterarray] = useState([]);
	const [infohurtarray, setinfohurtarray] = useState([]);

	const [data, setData] = useState({
		name: "",
		lastname: "",
		personalnumber: "",
		cellphone: "",
		typevent: "",
		pikodrep: "",
		ogdarep: "",
		hativarep: "",
		gdod: "",
		gdodrep: "",
		mkabaz: "",
		arraymkabaz: [],
		zadik: "",
		resevent: "",
		yn: "",
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
		hurtarray: [],
		//* report Hatal
		totalWorkHours: "",
		totalCostWorkHours: "",
		damageCost: "",
		spareCost: "",
		error: false,
		successmsg: false,
		loading: false,
		redirectToReferrer: false,
		//
	});
	//* pikod data
	const [gdods, setGdods] = useState([]);
	const [hativas, setHativas] = useState([]);
	const [ogdas, setOgdas] = useState([]);
	const [pikods, setPikods] = useState([]);
	//* pikodrep data
	const [gdodsrep, setGdodsrep] = useState([]);
	const [hativasrep, setHativasrep] = useState([]);
	const [ogdasrep, setOgdasrep] = useState([]);
	const [pikodsrep, setPikodsrep] = useState([]);

	//* isRekem
	const [mkabazsRekem, setRekem] = useState([]);
	const [indexM, setIndexM] = useState(0);
	// * cardata
	const [mkabazs, setMkabazs] = useState([]);
	const [magads, setMagads] = useState([]);
	const [magadals, setMagadals] = useState([]);

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

	const getRekem = async (magadid) => {
		let tempmagadmkabazs = [];
		if (magadid != undefined) {
			await axios
				//? should work need to test on real db
				.get(`http://localhost:8000/api/mkabaz/mkabazsbyrekem/${magadid}`)
				.then((response) => {
					for (let j = 0; j < response.data.length; j++)
						tempmagadmkabazs.push(response.data[j]);
				})
				.catch((error) => {
					console.log(error);
				});
			console.log(tempmagadmkabazs);
			setRekem(tempmagadmkabazs);
		}
	};

	// const getCartypesfilterarray= async () => {
	// 	let arraymk=[];
	// 	for(let i=0;i<arraymkabaz.length;i++)
	// 	   arraymk[i]=arraymkabaz[i];
	// 	setCartypesfilterarray(arraymk);
	// };

	//* manmarit

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

	//* rep

	const loadPikodsrep = async () => {
		await axios
			.get("http://localhost:8000/api/pikod")
			.then((response) => {
				// setPikods(response.data);
				setPikodsrep(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadOgdasrep = async (pikodids) => {
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
		// setOgdas(temppikodsogdas);
		setOgdasrep(temppikodsogdas);
	};

	const loadHativasrep = async (ogdaids) => {
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
		// setHativas(tempogdashativas);
		setHativasrep(tempogdashativas);
	};

	const loadGdodsrep = async (hativaids) => {
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
		// setGdods(temphativasgdods);
		setGdodsrep(temphativasgdods);
	};

	function handleChange(evt) {
		const value = evt.target.value;
		if (evt.target.name != "cellphone" && evt.target.name != "zadik") {
			setData({ ...data, [evt.target.name]: value });
		} else {
			if (digits_only(value)) {
				setData({ ...data, [evt.target.name]: value });
			} else {
				// console.log("you used letter in the phone number");
				toast.error("לא ניתן לכתוב אותיות בשדה זה");
			}
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
		data.typevent != "רקם"
			? CheckSignUpForm(event)
			: CheckSignUpFormRekem(event);
	};

	const CheckSignUpForm = (event) => {
		event.preventDefault();
		var flag = true;
		var ErrorReason = "";
		if (data.name == "") {
			flag = false;
			ErrorReason += " שם ריק \n";
		}
		if (data.lastname == "") {
			flag = false;
			ErrorReason += " שם משפחה ריק \n";
		}
		if (data.personalnumber == "") {
			flag = false;
			ErrorReason += " מס אישי ריק \n";
		}
		if (data.cellphone == "") {
			flag = false;
			ErrorReason += " טלפון ריק \n";
		}
		// if (
		// 	document.getElementById("seltype").options[
		// 		document.getElementById("seltype").selectedIndex
		// 	].value == "בחר"
		// ) {
		// 	flag = false;
		// 	ErrorReason += " סוג אירוע ריק \n";
		// }

		if (
			data.typevent === "1" ||
			data.typevent === "2" ||
			data.typevent === "3" ||
			data.typevent === "4"
		) {
			if (
				document.getElementById("res").options[
					document.getElementById("res").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "סיבת האירוע ריקה \n";
			}
			if (
				!document.getElementById("YES").checked &&
				!document.getElementById("NO").checked
			) {
				flag = false;
				ErrorReason += " ,אם נגרם נזק לכלי ריק \n";
			}
		}
		if (data.typevent === "5") {
			if (data.selneshek == "") {
				flag = false;
				ErrorReason += " סוג הנשק/ תחמושת ריק\n";
			}
			if (
				!document.getElementById("YES").checked &&
				!document.getElementById("NO").checked
			) {
				flag = false;
				ErrorReason += " ,אם נגרם נזק ריק \n";
			}
			if (
				document.getElementById("what").options[
					document.getElementById("what").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += " מה התרחש באירוע ריק \n";
			}
		}
		if (data.typevent === "6") {
			if (
				document.getElementById("when").options[
					document.getElementById("when").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "מתי הנפגע ריק \n";
			}
			if (data.amlah == "") {
				flag = false;
				ErrorReason += " סוג האמלח ריק \n";
			}
		}
		if (data.typevent === "7") {
			if (data.zadik == "") {
				flag = false;
				ErrorReason += "  צ' ריק\n";
			}
			if (
				document.getElementById("mataf").options[
					document.getElementById("mataf").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "סוג מטף ריק \n";
			}
			// if (
			// 	document.getElementById("rekem").options[
			// 		document.getElementById("rekem").selectedIndex
			// 	].value == "0"
			// ) {
			// 	flag = false;
			// 	ErrorReason += " סוג הרק'ם ריק \n";
			// }
			if (
				document.getElementById("mazav").options[
					document.getElementById("mazav").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "מצב הרק'ם ריק \n";
			}
			if (
				document.getElementById("dwork").options[
					document.getElementById("dwork").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += " האם בוצע במהלך עבודה ריק  \n";
			}
			if (
				!document.getElementById("YES").checked &&
				!document.getElementById("NO").checked
			) {
				flag = false;
				ErrorReason += " ,אם בפירוק / הרכבה ריק \n";
			}
		}
		if (data.typevent === "8") {
			if (
				document.getElementById("apidmia").options[
					document.getElementById("apidmia").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "סוג אפידמיה ריק \n";
			}
		}
		if (data.typevent === "9") {
			if (
				document.getElementById("mholaz").options[
					document.getElementById("mholaz").selectedIndex
				].value == "0"
			) {
				flag = false;
				ErrorReason += "סוג הכלי המחולץ ריק \n";
			}
			if (data.zadik == "") {
				flag = false;
				ErrorReason += "  צ' ריק\n";
			}
			// if (
			//   document.getElementById("mhalz").options[
			//     document.getElementById("mhalz").selectedIndex
			//   ].value == "0"
			// ) {
			//   flag = false;
			//   ErrorReason += "סוג הכלי המחלץ ריק \n";
			// }
		}
		if (data.pirot == "") {
			flag = false;
			ErrorReason += "  פירוט האירוע ריק \n";
		}
		if (data.mikom == "") {
			flag = false;
			ErrorReason += " ,מיקום ריק \n";
		}

		if (!data.datevent) {
			flag = false;
			ErrorReason += " ,תאריך ריק \n";
		}
		// if (data.nifga == "") {
		// 	flag = false;
		// 	ErrorReason += "כמות הנפגעים ריקה \n";
		// }

		if (flag == true) {
			FixUser(event);
		} else {
			toast.error(ErrorReason);
		}
	};
	const CheckSignUpFormRekem = (event) => {
		event.preventDefault();
		var flag = true;
		var ErrorReason = "";
		if (data.name == "") {
			flag = false;
			ErrorReason += " ,שם ריק \n";
		}
		if (data.lastname == "") {
			flag = false;
			ErrorReason += " ,שם משפחה ריק \n";
		}
		if (data.personalnumber == "") {
			flag = false;
			ErrorReason += " ,מס אישי ריק \n";
		}
		if (data.cellphone == "") {
			flag = false;
			ErrorReason += " ,טלפון ריק \n";
		}
		// if (
		//   document.getElementById("pikod").options[
		//     document.getElementById("pikod").selectedIndex
		//   ].value == "בחר"
		// ) {
		//   flag = false;
		//   ErrorReason += " פיקוד ריק \n";
		// }
		// if (
		//   document.getElementById("ogda").options[
		//     document.getElementById("ogda").selectedIndex
		//   ].value == "0"
		// ) {
		//   flag = false;
		//   ErrorReason += " אוגדה ריק \n";
		// }
		// if (
		//   document.getElementById("hativa").options[
		//     document.getElementById("hativa").selectedIndex
		//   ].value == "0"
		// ) {
		//   flag = false;
		//   ErrorReason += " חטיבה ריק \n";
		// }
		// if (
		//   document.getElementById("gdod").options[
		//     document.getElementById("gdod").selectedIndex
		//   ].value == "0"
		// ) {
		//   flag = false;
		//   ErrorReason += " גדוד ריק \n";
		// }
		if (
			document.getElementById("res").options[
				document.getElementById("res").selectedIndex
			].value == "0"
		) {
			flag = false;
			ErrorReason += " ,סיבת האירוע ריקה \n";
		}
		// if (
		// 	document.getElementById("sel").options[
		// 		document.getElementById("sel").selectedIndex
		// 	].value == "0"
		// ) {
		// 	flag = false;
		// 	ErrorReason += " ,סוג הרקם ריק \n";
		// }
		if (
			!document.getElementById("YES").checked &&
			!document.getElementById("NO").checked
		) {
			flag = false;
			ErrorReason += " ,אם נגרם נזק ריק \n";
		}
		if (data.pirot == "") {
			flag = false;
			ErrorReason += "  פירוט האירוע ריק \n";
		}
		if (data.mikom == "") {
			flag = false;
			ErrorReason += " ,מיקום ריק \n";
		}
		if (!data.datevent) {
			flag = false;
			ErrorReason += " ,תאריך ריק \n";
		}
		// if (data.nifga == "") {
		// 	flag = false;
		// 	ErrorReason += "כמות הנפגעים ריקה \n";
		// }

		if (flag == true) {
			FixUser(event);
		} else {
			toast.error(ErrorReason);
		}
	};

	const FixUser = (event) => {
		event.preventDefault();
		UpdateReport(event);
	};

	const UpdateReport = () => {
		console.log(match);
		console.log(match.cardataid);
		var reportid = match.cardataid;
		const report = {
			name: data.name,
			lastname: data.lastname,
			personalnumber: data.personalnumber,
			cellphone: data.cellphone,
			pikodrep: data.pikodrep,
			ogdarep: data.ogdarep,
			hativarep: data.hativarep,
			gdod: data.gdod,
			gdodrep: data.gdodrep,
			typevent: data.typevent,
			resevent: data.resevent,
			// magadal: data.magadal,
			// magad:data.magad,
			arraymkabaz: cartypesfilterarray,
			mkabaz: data.mkabaz,
			zadik: data.zadik,
			yn: data.yn,
			selneshek: data.selneshek,
			whap: data.whap,
			amlahtype: data.amlahtype,
			rekemtype: data.rekemtype,
			mazavrekem: data.mazavrekem,
			dwork: data.dwork,
			mataftype: data.mataftype,
			apitype: data.apitype,
			mholaztype: data.mholaztype,
			// mhalztype: data.mhalztype,
			pirot: data.pirot,
			datevent: data.datevent,
			mikom: data.mikom,
			nifga: data.nifga,
			hurtarray: infohurtarray,
			totalWorkHours: data.totalWorkHours,
			totalCostWorkHours: data.totalCostWorkHours,
			damageCost: data.damageCost,
			spareCost: data.spareCost,
		};
		console.log(report.gdod);
		if (!(report.gdod == "בחר")) {
			if (!(report.gdodrep == "בחר")) {
				axios
					.put(`http://localhost:8000/report/update/${reportid}`, report)
					.then((response) => {
						toast.success(`הדיווח עודכן בהצלחה`);
						match.ToggleForModal();
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				toast.error("לא הוזנה יחידה מדווחת");
			}
		} else {
			toast.error("לא הוזנה יחידה מנמרית");
		}
	};

	const init = () => {
		// console.log(match);
		var reportid = match.cardataid;
		axios
			.get(`http://localhost:8000/report/${reportid}`)
			.then((response) => {
				// console.log(response);
				// let tempuser = { ...response.data };
				// setData(tempuser);
				let tempcardata = response.data[0];
				setData(tempcardata);
				setCartypesfilterarray(tempcardata.arraymkabaz);
				setinfohurtarray(tempcardata.hurtarray);
			})
			.catch((error) => {
				console.log(error);
			});
		loadPikods();
		loadPikodsrep();
		getMagadals();
	};

	useEffect(() => {
		if (match.isOpen == true) init();
	}, [match.isOpen]);

	// * ------ manmarit --------------------------------
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
	//* ------ rep ----------------------------------------------------------------
	useEffect(() => {
		setOgdasrep([]);
		loadOgdasrep(data.pikodrep);
	}, [data.pikodrep]);

	useEffect(() => {
		setHativasrep([]);
		loadHativasrep(data.ogdarep);
	}, [data.ogdarep]);

	useEffect(() => {
		setGdodsrep([]);
		loadGdodsrep(data.hativarep);
	}, [data.hativarep]);

	//* ------ magdal .... --------------------------------
	useEffect(() => {
		setMagads([]);
		getMagads(data.magadal);
	}, [data.magadal]);

	useEffect(() => {
		setMkabazs([]);
		getMkabazs(data.magad);
	}, [data.magad]);

	useEffect(() => {
		setRekem([]);
		getRekem();
	}, [data.mkabaz]);

	useEffect(() => {
		setCartypesfilterarray([]);
		setinfohurtarray([]);
	}, []);

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
							עידכון דיווח חט"ל{" "}
						</CardTitle>
						{/*headline*/}
					</CardHeader>
					<CardBody style={{ direction: "rtl" }}>
						<div>
							<Container className="mt--8 pb-5">
								<Row className="justify-content-center">
									<Card className="shadow border-0">
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
												{/*//* --------------------------------------- rep ------------------------------------------- */}
												<div className="text-center text-muted mb-4">
													<small>פרטי יחידה מדווחת</small>
												</div>
												<Row style={{ paddingTop: "2px" }}>
													{!data.ogdarep ? (
														<Col
															style={{
																justifyContent: "right",
																alignContent: "right",
																textAlign: "right",
															}}
														>
															<h6>פיקוד</h6>
															<Select
																data={pikodsrep}
																handleChange2={handleChange2}
																name={"pikodrep"}
																val={data.pikodrep ? data.pikodrep : undefined}
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
																data={pikodsrep}
																handleChange2={handleChange2}
																name={"pikodrep"}
																val={data.pikodrep ? data.pikodrep : undefined}
																isDisabled={true}
															/>
														</Col>
													)}

													<>
														{data.pikodrep && !data.hativarep ? (
															<Col
																style={{
																	justifyContent: "right",
																	alignContent: "right",
																	textAlign: "right",
																}}
															>
																<h6>אוגדה</h6>
																<Select
																	data={ogdasrep}
																	handleChange2={handleChange2}
																	name={"ogdarep"}
																	val={data.ogdarep ? data.ogdarep : undefined}
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
																	data={ogdasrep}
																	handleChange2={handleChange2}
																	name={"ogdarep"}
																	val={data.ogdarep ? data.ogdarep : undefined}
																	isDisabled={true}
																/>
															</Col>
														)}
													</>

													<>
														{data.ogdarep && !data.gdodrep ? (
															<Col
																style={{
																	justifyContent: "right",
																	alignContent: "right",
																	textAlign: "right",
																}}
															>
																<h6>חטיבה</h6>
																<Select
																	data={hativasrep}
																	handleChange2={handleChange2}
																	name={"hativarep"}
																	val={
																		data.hativarep ? data.hativarep : undefined
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
																	data={hativasrep}
																	handleChange2={handleChange2}
																	name={"hativarep"}
																	val={
																		data.hativarep ? data.hativarep : undefined
																	}
																	isDisabled={true}
																/>
															</Col>
														)}
													</>

													<>
														{data.hativarep ? (
															<Col
																style={{
																	justifyContent: "right",
																	alignContent: "right",
																	textAlign: "right",
																}}
															>
																<h6>גדוד</h6>
																<Select
																	data={gdodsrep}
																	handleChange2={handleChange2}
																	name={"gdodrep"}
																	val={data.gdodrep ? data.gdodrep : undefined}
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
																	data={gdodsrep}
																	handleChange2={handleChange2}
																	name={"gdodrep"}
																	val={data.gdodrep ? data.gdodrep : undefined}
																	isDisabled={true}
																/>
															</Col>
														)}
													</>
												</Row>
												{/* //* ----------------------------------------- manmarit ---------------------------------------------- */}
												<div className="text-center text-muted mb-4">
													<small>פרטי יחידה מנמרית</small>
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
																	val={data.hativa ? data.hativa : undefined}
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
																	val={data.hativa ? data.hativa : undefined}
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
												<div style={{ textAlign: "right", paddingTop: "10px" }}>
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
												<div style={{ textAlign: "right", paddingTop: "10px" }}>
													סוג הרק"ם
												</div>
												<Row style={{ padding: "0px" }}>
													<Col
														style={{
															display: "flex",
															justifyContent: "right",
															paddingTop: "15px",
															paddingRight: "0px",
														}}
													>
														<Button
															style={{ width: "100px", padding: "10px" }}
															type="button"
															onClick={() => {
																setCartypesfilterarray((currentSpec) => [
																	...currentSpec,
																	{ id: generate() },
																]);
															}}
														>
															הוסף רק"ם
														</Button>
													</Col>
												</Row>
												{cartypesfilterarray.map(
													(cartypesfilterobject, index) => {
														return (
															<CarTypesFilterObjectRekem
																cartypesfilterobject={cartypesfilterobject}
																index={index}
																setCartypesfilterarray={setCartypesfilterarray}
															/>
														);
													}
												)}
												<div style={{ textAlign: "right", paddingTop: "10px" }}>
													האם נגרם נזק לרק"ם
												</div>
												<div style={{ textAlign: "right" }}>
													{data.yn == true ? (
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
																	checked={data.yn == true}
																	type="radio"
																	name="yn"
																	value={true}
																	onChange={handleChange}
																	id="YES"
																/>
																כן
															</div>
														</FormGroup>
													) : (
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
																/>
																כן
															</div>
														</FormGroup>
													)}

													{data.yn == false ? (
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
																	checked={data.yn == false}
																	type="radio"
																	id="NO"
																	name="yn"
																	value={false}
																	onChange={handleChange}
																/>
																לא
															</div>
														</FormGroup>
													) : (
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
																/>
																לא
															</div>
														</FormGroup>
													)}
												</div>

												<FormGroup dir="rtl">
													<Input
														placeholder="פירוט האירוע"
														name="pirot"
														type="textarea"
														value={data.pirot}
														onChange={handleChange}
													/>
												</FormGroup>
												<div style={{ textAlign: "right", paddingTop: "10px" }}>
													תאריך אירוע
												</div>
												<FormGroup dir="rtl">
													<Input
														placeholder="תאריך אירוע"
														name="datevent"
														type="datetime-local"
														value={data.datevent.slice(0, 21)}
														onChange={handleChange}
														min={"1900-01-01T00:00:00"}
														max={"2100-01-01T00:00:00"}
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
												<div style={{ textAlign: "right", paddingTop: "10px" }}>
													האם יש נפגעים
												</div>
												<div
													className="mb-2"
													style={{ textAlign: "right" }}
												>
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
																checked={data.nifga == 1}
																// placeholder="ללא נפגעים "
																name="nifga"
																type="radio"
																value="1"
																onChange={handleChange}
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
																checked={data.nifga == 0}
																// placeholder="הוסף נפגעים"
																name="nifga"
																type="radio"
																value="0"
																onChange={handleChange}
																disabled
															/>
															ללא נפגעים
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
																checked={data.nifga == 2}
																// placeholder="הוסף נפגעים"
																name="nifga"
																type="radio"
																value="2"
																onChange={handleChange}
																disabled
															/>
															לא ידוע
														</div>
													</FormGroup>

												</div>
												{data.nifga === "1" && (
													<>
														<div>
															{infohurtarray.length == 0 ? (
																<Row>
																	<Col
																		style={{
																			display: "flex",
																			textAlign: "right",
																		}}
																	>
																		<Button
																			style={{
																				width: "100px",
																				padding: "5px",
																			}}
																			type="button"
																			onClick={() => {
																				setinfohurtarray((currentSpec) => [
																					...currentSpec,
																					{ id: generate() },
																				]);
																			}}
																		>
																			הוסף נפגע
																		</Button>
																	</Col>
																</Row>
															) : (
																infohurtarray.map((p, index) => {
																	return (
																		<div>
																			{index == 0 ? (
																				<Row>
																					<Col
																						style={{
																							display: "flex",
																							textAlign: "right",
																						}}
																					>
																						<Button
																							style={{
																								width: "100px",
																								padding: "5px",
																							}}
																							type="button"
																							onClick={() => {
																								setinfohurtarray(
																									(currentSpec) => [
																										...currentSpec,
																										{ id: generate() },
																									]
																								);
																							}}
																						>
																							הוסף נפגע
																						</Button>
																					</Col>
																				</Row>
																			) : null}
																			{
																				<Row>
																					<Col
																						xs={12}
																						md={4}
																					>
																						<div>
																							<p
																								style={{
																									margin: "0px",
																									float: "right",
																								}}
																							>
																								דרגת הפציעה
																							</p>
																							<Input
																								onChange={(e) => {
																									const dargahurt =
																										e.target.value;
																									if (e.target.value != "בחר")
																										setinfohurtarray(
																											(currentSpec) =>
																												produce(
																													currentSpec,
																													(v) => {
																														v[index].dargahurt =
																															dargahurt;
																													}
																												)
																										);
																								}}
																								value={p.dargahurt}
																								type="select"
																								placeholder="דרגת הפציעה"
																							>
																								<option value={"בחר"}>
																									{"בחר"}
																								</option>
																								<option value={"קל"}>
																									{"קל"}
																								</option>
																								<option value={"בינוני"}>
																									{"בינוני"}
																								</option>
																								<option value={"קשה"}>
																									{"קשה"}
																								</option>
																								<option value={"מת"}>
																									{"מת"}
																								</option>
																							</Input>
																						</div>
																					</Col>
																					<Col
																						xs={12}
																						md={4}
																					>
																						<div>
																							<p
																								style={{
																									margin: "0px",
																									float: "right",
																								}}
																							>
																								מספר ימי מחלה
																							</p>
																							<Input
																								onChange={(e) => {
																									const mikomhurt =
																										e.target.value;
																									if (e.target.value != "")
																										setinfohurtarray(
																											(currentSpec) =>
																												produce(
																													currentSpec,
																													(v) => {
																														v[index].mikomhurt =
																															mikomhurt;
																													}
																												)
																										);
																								}}
																								value={p.mikomhurt}
																								type="number"
																								placeholder="0"
																								min="0"
																							/>
																						</div>
																					</Col>
																				</Row>
																			}
																			<Button
																				type="button"
																				onClick={() => {
																					setinfohurtarray((currentSpec) =>
																						currentSpec.filter(
																							(x) => x.id !== p.id
																						)
																					);
																				}}
																			>
																				<img
																					src={deletepic}
																					height="20px"
																				></img>
																			</Button>
																		</div>
																	);
																})
															)}
														</div>
													</>
												)}
												{/*//* report Hatal */}
												<div
													className="mt-3 mb-3"
													style={{
														justifyContent: "right",
														alignContent: "right",
														textAlign: "right",
													}}
												>
													<FormGroup
														className="mb-3"
														dir="rtl"
													>
														<h6>סה"כ שעות עבודה</h6>
														<Input
															name="totalWorkHours"
															type="number"
															min="0"
															value={
																data.totalWorkHours == undefined
																	? 0
																	: data.totalWorkHours
															}
															onChange={handleChange}
														/>
													</FormGroup>
													<FormGroup
														className="mb-3"
														dir="rtl"
													>
														<h6> ₪ סה"כ עלות שעות עבודה</h6>
														<Input
															name="totalCostWorkHours"
															type="number"
															min="0"
															step="0.01"
															value={
																data.totalCostWorkHours == undefined
																	? 0
																	: data.totalCostWorkHours
															}
															onChange={handleChange}
														/>
													</FormGroup>
													<FormGroup
														className="mb-3"
														dir="rtl"
													>
														<h6> ₪ עלות הנזק</h6>
														<Input
															name="damageCost"
															type="number"
															min="0"
															step="0.01"
															value={
																data.damageCost == undefined
																	? 0
																	: data.damageCost
															}
															onChange={handleChange}
														/>
													</FormGroup>
													<FormGroup
														className="mb-3"
														dir="rtl"
													>
														<h6> ₪ עלות החלפים</h6>
														<Input
															name="spareCost"
															type="number"
															min="0"
															step="0.01"
															value={
																data.spareCost == undefined ? 0 : data.spareCost
															}
															onChange={handleChange}
														/>
													</FormGroup>
												</div>
												<div className="text-center">
													<button
														onClick={clickSubmit}
														className="btn-new-blue"
													>
														עדכן
													</button>
												</div>
											</Form>
										</CardBody>
									</Card>
								</Row>
							</Container>
						</div>
					</CardBody>
				</Card>
			</ModalBody>
		</Modal>
	);
};
export default withRouter(CarDataFormModalHatal);
