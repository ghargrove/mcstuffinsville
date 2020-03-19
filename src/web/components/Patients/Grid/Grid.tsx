import React from 'react'

import { IPatient } from '../../../../server/store'
import * as Cells from './Cells'
import { Row } from './Row'

// TODO: Dynamic rendering
const Header: React.FC = () => (
  <Row>
    <Cells.FirstNameCell>First Name</Cells.FirstNameCell>
    <Cells.LastNameCell>Last name</Cells.LastNameCell>
    <Cells.EmailCell>Email</Cells.EmailCell>
    <Cells.GenderCell>Gender</Cells.GenderCell>
    <Cells.AddressCell>Address</Cells.AddressCell>
    <Cells.PrescriptionsCell>Prescriptions</Cells.PrescriptionsCell>
  </Row>
)

// TODO: Dyanmic rendering
const DataRow: React.FC<{ patient: IPatient }> = ({ patient }) => (
  <Row>
    <Cells.FirstNameCell>{`${patient.id} -> ${patient.firstName}`}</Cells.FirstNameCell>
    <Cells.LastNameCell>{patient.lastName}</Cells.LastNameCell>
    <Cells.EmailCell>{patient.email}</Cells.EmailCell>
    <Cells.GenderCell>{patient.gender}</Cells.GenderCell>
    <Cells.AddressCell>
      <p>{patient.address}</p>
      <p>
        {patient.city}, {patient.state} {patient.zipCode}
      </p>
    </Cells.AddressCell>
    <Cells.PrescriptionsCell>{patient.prescription}</Cells.PrescriptionsCell>
  </Row>
)

interface IPatientGridProps {
  patients: IPatient[]
}

const PatientGrid: React.FC<IPatientGridProps> = ({ patients }) => {
  return (
    <React.Fragment>
      <Header />
      {patients.map((p, i) => (
        <DataRow key={i} patient={p} />
      ))}
    </React.Fragment>
  )
}

export default PatientGrid
