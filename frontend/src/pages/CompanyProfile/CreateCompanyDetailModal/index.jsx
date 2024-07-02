import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";
import { toast } from "react-toastify";

const CreateCompanyDetailModal = ({ show, handleClose }) => {
	const [companyName, setCompanyName] = useState("");
	const [dateFounder, setDateFounder] = useState("");
	const [mainAddress, setMainAddress] = useState("");
	const [mainPhoneNumber, setMainPhoneNumber] = useState("");
	const [companyWebsite, setCompanyWebsite] = useState("");
	const [companySector, setCompanySector] = useState("");
	const [companyDescription, setCompanyDescription] = useState("");
	const [totalRevenue, setTotalRevenue] = useState("");
	const [netIncome, setNetIncome] = useState("");
	const [fullTimeEmployees, setFullTimeEmployees] = useState("");
	const [partTimeEmployees, setPartTimeEmployees] = useState("");
	const [contactInformation, setContactInformation] = useState("");
	const [siteInformation, setSiteInformation] = useState([{ siteName: "", numberOfEmployees: "", comment: "" }]);
	const [productInformation, setProductInformation] = useState([{ productName: "", revenue: "", comment: "" }]);

	const handleSiteChange = (index, field, value) => {
		const updatedSites = siteInformation.map((site, i) => {
			if (i === index) {
				return { ...site, [field]: value };
			}
			return site;
		});
		setSiteInformation(updatedSites);
	};

	const handleProductChange = (index, field, value) => {
		const updatedProducts = productInformation.map((product, i) => {
			if (i === index) {
				return { ...product, [field]: value };
			}
			return product;
		});
		setProductInformation(updatedProducts);
	};

	const handleAddSite = () => {
		setSiteInformation([...siteInformation, { siteName: "", numberOfEmployees: "", comment: "" }]);
	};

	const handleRemoveSite = (index) => {
		const updatedSites = siteInformation.filter((site, i) => i !== index);
		setSiteInformation(updatedSites);
	};

	const handleAddProduct = () => {
		setProductInformation([...productInformation, { productName: "", revenue: "", comment: "" }]);
	};

	const handleRemoveProduct = (index) => {
		const updatedProducts = productInformation.filter((product, i) => i !== index);
		setProductInformation(updatedProducts);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			companyName,
			dateFounder,
			mainAddress,
			mainPhoneNumber,
			companyWebsite,
			companySector,
			companyDescription,
			totalRevenue,
			netIncome,
			fullTimeEmployees,
			partTimeEmployees,
			contactInformation,
			siteInformation,
			productInformation,
		};

		axios
			.post("http://localhost:8080/create-company-infor", data)
			.then((response) => {
				console.log(response.data);
				handleClose();
                toast.success("Thêm thành công bài viết!");
			})
			.catch((error) => {
				console.error("There was an error submitting the form!", error);
                toast.error("Error")
			});
	};

	return (
		<Modal show={show} onHide={handleClose} centered size="xl">
			<Modal.Header closeButton>
				<Modal.Title>Add company</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form onSubmit={handleSubmit}>
					<h4>Overall information</h4>
					<div className="form-group">
						<label>Company Name</label>
						<input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
					</div>
					<div className="form-group">
						<label>Date Founded</label>
						<input type="text" className="form-control" value={dateFounder} onChange={(e) => setDateFounder(e.target.value)} required />
					</div>
					<div className="form-group">
						<label>Main Address</label>
						<input type="text" className="form-control" value={mainAddress} onChange={(e) => setMainAddress(e.target.value)} required />
					</div>
					<div className="form-group">
						<label>Main Phone Number</label>
						<input type="text" className="form-control" value={mainPhoneNumber} onChange={(e) => setMainPhoneNumber(e.target.value)} required />
					</div>
					<div className="form-group">
						<label>Company Website</label>
						<input type="text" className="form-control" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} required />
					</div>
					<div className="form-group">
						<label>Company Sector</label>
						<input type="text" className="form-control" value={companySector} onChange={(e) => setCompanySector(e.target.value)} required />
					</div>
					<div className="form-group">
						<label>Company Description</label>
						<input type="text" className="form-control" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} required />
					</div>
					<div className="form-group">
						<label>Total Revenue</label>
						<input type="number" className="form-control" value={totalRevenue} onChange={(e) => setTotalRevenue(e.target.value)} required />
					</div>
					<div className="form-group">
						<label>Net Income</label>
						<input type="number" className="form-control" value={netIncome} onChange={(e) => setNetIncome(e.target.value)} required />
					</div>
					<div className="form-group">
						<label>Full Time Employees</label>
						<input type="number" className="form-control" value={fullTimeEmployees} onChange={(e) => setFullTimeEmployees(e.target.value)} required />
					</div>
					<div className="form-group">
						<label>Part Time Employees</label>
						<input type="number" className="form-control" value={partTimeEmployees} onChange={(e) => setPartTimeEmployees(e.target.value)} required />
					</div>
					<div className="form-group">
						<label>Contact Information</label>
						<ReactQuill value={contactInformation} onChange={setContactInformation} className="custom-quill-editor" />
					</div>
					<br />
					<h4>Site Information</h4>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Site Name</th>
								<th>Number of Employees</th>
								<th>Comment</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{siteInformation.map((site, index) => (
								<tr key={index}>
									<td>
										<input type="text" className="form-control" value={site.siteName} onChange={(e) => handleSiteChange(index, "siteName", e.target.value)} required />
									</td>
									<td>
										<input
											type="number"
											className="form-control"
											value={site.numberOfEmployees}
											onChange={(e) => handleSiteChange(index, "numberOfEmployees", e.target.value)}
											required
										/>
									</td>
									<td>
										<input type="text" className="form-control" value={site.comment} onChange={(e) => handleSiteChange(index, "comment", e.target.value)} />
									</td>
									<td>
										<Button variant="danger" onClick={() => handleRemoveSite(index)}>
											Remove
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Button variant="primary" onClick={handleAddSite}>
						Add Site
					</Button>

					<h4 className="mt-4">Product Information</h4>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Revenue</th>
								<th>Comment</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{productInformation.map((product, index) => (
								<tr key={index}>
									<td>
										<input type="text" className="form-control" value={product.productName} onChange={(e) => handleProductChange(index, "productName", e.target.value)} required />
									</td>
									<td>
										<input type="number" className="form-control" value={product.revenue} onChange={(e) => handleProductChange(index, "revenue", e.target.value)} required />
									</td>
									<td>
										<input type="text" className="form-control" value={product.comment} onChange={(e) => handleProductChange(index, "comment", e.target.value)} />
									</td>
									<td>
										<Button variant="danger" onClick={() => handleRemoveProduct(index)}>
											Remove
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Button variant="primary" onClick={handleAddProduct}>
						Add Product
					</Button>
					<br />
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
				</form>
			</Modal.Body>
		</Modal>
	);
};

export default CreateCompanyDetailModal;
