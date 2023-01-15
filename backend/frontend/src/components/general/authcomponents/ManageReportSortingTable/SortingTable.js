import React, { useMemo, useState, useEffect } from "react";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	useFilters,
	usePagination,
} from "react-table";
import { withRouter, Redirect, Link } from "react-router-dom";
import { COLUMNS } from "./coulmns";
import { GlobalFilter } from "./GlobalFilter";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { isAuthenticated } from "auth";
import history from "history.js";

const SortingTable = ({ match }) => {
	const columns = useMemo(() => COLUMNS, []);
	const { user } = isAuthenticated();
	const [data, setData] = useState([]);
	//units

	const UserDelete = (UserId) => {
		axios
			.post(`http://localhost:8000/api/user/remove/${UserId}`)
			.then((response) => {
				loadUsers();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadUsers = () => {
		axios
			.get("http://localhost:8000/api/usersvalidated")
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// useEffect(() => {
	//   (async () => {
	//     console.log("================================================");
	//     console.log(user.personalnumber);
	//     const result = await axios.get(
	//       `http://localhost:8000/report/requestByPersonalnumber/${user.personalnumber}`
	//     );
	//     console.log(result);
	//     setData(result.data);
	//   })();
	// }, []);

	useEffect(() => {
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

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,

		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize, globalFilter },
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},

		useGlobalFilter,
		useFilters,
		useSortBy,
		usePagination
	);

	return (
		<>
			<GlobalFilter
				filter={globalFilter}
				setFilter={setGlobalFilter}
			/>
			<div
				className="table-responsive"
				style={{ overflow: "auto" }}
			>
				<table
					id="table-to-xls-users"
					{...getTableProps()}
				>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th>
										<div
											{...column.getHeaderProps(column.getSortByToggleProps())}
										>
											{" "}
											{column.render("Header")}{" "}
										</div>
										<div>
											{column.canFilter ? column.render("Filter") : null}
										</div>
										<div>
											{column.isSorted
												? column.isSortedDesc
													? "🔽"
													: "⬆️"
												: ""}
										</div>
									</th>
								))}
								<th>עדכן</th>
								<th>צפייה</th>
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										if (
											cell.column.id != "typevent" &&
											cell.column.id != "pirot" &&
											cell.column.id != "datevent"
										) {
											return (
												<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
											);
										} else {
											if (cell.column.id == "typevent") {
												if (cell.value == "1") return <td>תאונת כלי רכב</td>;
												if (cell.value == "2") return <td>התהפכות</td>;
												if (cell.value == "3") return <td>הנתקות גלגל</td>;
												if (cell.value == "4") return <td>שריפה</td>;
												if (cell.value == "5")
													return <td>אירוע נשק / תחמושת</td>;
												if (cell.value == "6")
													return <td>תאונת עבודה אנשי טנ"א</td>;
												if (cell.value == "7") return <td>פריקת מטפים</td>;
												if (cell.value == "8") return <td>אפידמיה</td>;
												if (cell.value == "9") return <td>חילוץ</td>;
												if (cell.value == "10")
													return <td>נזק לתשתיות אחזקה / הח"י</td>;
												if (cell.value == "11")
													return <td>אי קיום שגרת אחזקה</td>;
												if (cell.value == "12") return <td>אחר</td>;
												if (cell.value == "רק'ם") return <td>רק"ם</td>;
											}
											if (cell.column.id == "pirot") {
												return <td>{cell.value}</td>;
											}

											if (cell.column.id == "datevent") {
												return (
													<td>
														{cell.value
															.slice(0, 10)
															.split("-")
															.reverse()
															.join("-")}
													</td>
												);
											}
										}
									})}
									{/* {console.log(row.original._id)} */}

									<td role="cell">
										{" "}
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											{" "}
											<Link to={`/editreport/${row.original._id}`}>
												<button className="btn-new">עדכן</button>
											</Link>{" "}
										</div>{" "}
									</td>

									{/*row.original._id=user._id*/}
									<td role="cell">
										{" "}
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											{" "}
											{/* <button
                        className="btn-new-delete"
                        onClick={() => UserDelete(row.original._id)}
                      >
                        צפייה
                      </button> */}
											<Link to={`/wachreport/${row.original._id}`}>
												<button className="btn-new-delete">צפייה</button>
											</Link>{" "}
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className="pagination">
					<button
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
					>
						{"<"}
					</button>{" "}
					<button
						onClick={() => nextPage()}
						disabled={!canNextPage}
					>
						{">"}
					</button>{" "}
					<span>
						עמוד{" "}
						<strong>
							{pageIndex + 1} מתוך {pageOptions.length}
						</strong>{" "}
					</span>
					<span>
						| חפש עמוד:{" "}
						<input
							type="number"
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								gotoPage(page);
							}}
							style={{ width: "100px", borderRadius: "10px" }}
						/>
					</span>{" "}
					<select
						style={{ borderRadius: "10px" }}
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option
								key={pageSize}
								value={pageSize}
							>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
		</>
	);
};
export default withRouter(SortingTable);
