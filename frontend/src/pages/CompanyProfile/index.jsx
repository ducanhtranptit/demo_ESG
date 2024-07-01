import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyDetailModal from "./CompanyDetailModal/index.jsx";
import { Table, Button } from "react-bootstrap";
import { baseUrl } from "../../config/url-config.js";

const CompanyListPage = () => {
	const [companies, setCompanies] = useState([]);
	const [selectedCompanyId, setSelectedCompanyId] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const fetchCompanies = async () => {
		try {
			console.log("99999999");
			return;
			const response = await axios.get(`https://test-backend-esg.grocerymanagement.id.vn/get-all-company`);
			if (response.data.status === 200) {
				setCompanies(response.data.data);
			} else {
				console.error("Failed to fetch companies");
			}
		} catch (error) {
			console.error("Error fetching companies:", error);
		}
	};

	const handleViewDetails = (companyId) => {
		setSelectedCompanyId(companyId);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setSelectedCompanyId(null);
	};

	useEffect(() => {
		fetchCompanies();
	}, []);

	return (
		<div className="container mt-5">
			<h2 className="mb-4">Company List</h2>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Company Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{companies.map((company) => (
						<tr key={company.id}>
							<td>{company.id}</td>
							<td>{company.companyName}</td>
							<td>
								<Button variant="primary" onClick={() => handleViewDetails(company.id)}>
									Xem chi tiết
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			{modalOpen && <CompanyDetailModal companyId={selectedCompanyId} closeModal={handleCloseModal} />}
		</div>
	);
};

export default CompanyListPage;
