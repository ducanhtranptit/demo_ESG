import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Spinner, Table } from "react-bootstrap";
import { baseUrl } from "../../../config/url-config";

const CompanyDetailModal = ({ companyId, closeModal }) => {
	const [companyDetails, setCompanyDetails] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchCompanyDetails = async (id) => {
		try {
			const response = await axios.get(`https://test-backend-esg.grocerymanagement.id.vn/get-all-company-infor/${id}`);
			if (response.data.status === 200) {
				setCompanyDetails(response.data.data);
			} else {
				console.error("Failed to fetch company details");
			}
		} catch (error) {
			console.error("Error fetching company details:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (companyId) {
			fetchCompanyDetails(companyId);
		}
	}, [companyId]);

	if (loading) {
		return (
			<Modal show={true} onHide={closeModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>Loading...</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					<Spinner animation="border" />
				</Modal.Body>
			</Modal>
		);
	}

	if (!companyDetails) return null;

	const { overallInfor, siteInfors, productInfors } = companyDetails;
	const { netIncome, totalRevenue, fullTimeEmployee, partTimeEmployee } = overallInfor[0];

	const profitPercentage = Math.floor((netIncome / totalRevenue) * 100);
	const workforcePercentage = Math.floor((partTimeEmployee / fullTimeEmployee) * 100);

	const totalSiteEmployees = siteInfors.reduce((total, site) => (total += site.numberEmployees), 0);
	const totalProductRevenue = productInfors.reduce((total, product) => (total += product.revenue), 0);

	return (
		<Modal show={true} onHide={closeModal} centered>
			<Modal.Header closeButton>
				<Modal.Title>{overallInfor[0].companyName}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="mb-3">
					<strong>Date Founder:</strong> {overallInfor[0].dateFounder}
				</div>
				<div className="mb-3">
					<strong>Main Address:</strong> {overallInfor[0].mainAddress}
				</div>
				<div className="mb-3">
					<strong>Main Phone Number:</strong> {overallInfor[0].mainPhoneNumber}
				</div>
				<div className="mb-3">
					<strong>Company Website:</strong>{" "}
					<a href={overallInfor[0].companyWebsite} target="_blank" rel="noopener noreferrer">
						{overallInfor[0].companyWebsite}
					</a>
				</div>
				<div className="mb-3">
					<strong>Company Sector:</strong> {overallInfor[0].companySector}
				</div>
				<div className="mb-3">
					<strong>Company Description:</strong> {overallInfor[0].companyDescription}
				</div>
				<hr />
				<div className="mb-3">
					<strong>Total Revenue:</strong> {totalRevenue}
				</div>
				<div className="mb-3">
					<strong>Net Income:</strong> {netIncome}
				</div>
				<div className="mb-3">
					<strong>% Profit:</strong> {profitPercentage}%
				</div>
				<hr />
				<div className="mb-3">
					<strong>Full Time Employees:</strong> {fullTimeEmployee}
				</div>
				<div className="mb-3">
					<strong>Part Time Employees:</strong> {partTimeEmployee}
				</div>
				<div className="mb-3">
					<strong>% of Total Workforce:</strong> {workforcePercentage}%
				</div>
				<hr />
				<div className="mb-3">
					<strong>Site Information:</strong>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Site Name</th>
								<th>Number of Employees</th>
								<th>Comment</th>
							</tr>
						</thead>
						<tbody>
							{siteInfors.map((site) => (
								<tr key={site.id}>
									<td>{site.siteName}</td>
									<td>{site.numberEmployees}</td>
									<td>{site.comment}</td>
								</tr>
							))}
							<tr>
								<td>
									<strong>Total</strong>
								</td>
								<td>
									<strong>{totalSiteEmployees}</strong>
								</td>
								<td></td>
							</tr>
						</tbody>
					</Table>
				</div>
				<div className="mb-3">
					<strong>Product Information:</strong>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Revenue</th>
								<th>Comment</th>
							</tr>
						</thead>
						<tbody>
							{productInfors.map((product) => (
								<tr key={product.id}>
									<td>{product.productName}</td>
									<td>{product.revenue}</td>
									<td>{product.comment}</td>
								</tr>
							))}
							<tr>
								<td>
									<strong>Total</strong>
								</td>
								<td>
									<strong>{totalProductRevenue}</strong>
								</td>
								<td></td>
							</tr>
						</tbody>
					</Table>
				</div>
				<div dangerouslySetInnerHTML={{ __html: overallInfor[0].contactInformation }} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModal}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CompanyDetailModal;
