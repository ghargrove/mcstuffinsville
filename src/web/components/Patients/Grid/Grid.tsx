import React from 'react'

import { IPatient } from '../../../../server/store'
import useFieldVisibility from '../../../hooks/useFieldVisibility'
import * as Cells from './Cells'
import { Row } from './Row'

const Header: React.FC = () => {
  const {
    fieldVisibility: {
      address,
      email,
      firstName,
      gender,
      lastName,
      prescriptions
    }
  } = useFieldVisibility()
  return (
    <Row>
      {firstName.isVisible && (
        <Cells.FirstNameCell>First name</Cells.FirstNameCell>
      )}
      {lastName.isVisible && <Cells.LastNameCell>Last name</Cells.LastNameCell>}
      {email.isVisible && <Cells.EmailCell>Email</Cells.EmailCell>}
      {gender.isVisible && <Cells.GenderCell>Gender</Cells.GenderCell>}
      {address.isVisible && <Cells.AddressCell>Address</Cells.AddressCell>}
      {prescriptions.isVisible && (
        <Cells.PrescriptionsCell>Prescriptions</Cells.PrescriptionsCell>
      )}
    </Row>
  )
}

const DataRow: React.FC<{ patient: IPatient }> = ({ patient }) => {
  const {
    fieldVisibility: {
      address,
      email,
      firstName,
      gender,
      lastName,
      prescriptions
    }
  } = useFieldVisibility()
  return (
    <Row>
      {firstName.isVisible && (
        <Cells.FirstNameCell>{`${patient.id} -> ${patient.firstName}`}</Cells.FirstNameCell>
      )}
      {lastName.isVisible && (
        <Cells.LastNameCell>{patient.lastName}</Cells.LastNameCell>
      )}
      {email.isVisible && <Cells.EmailCell>{patient.email}</Cells.EmailCell>}
      {gender.isVisible && (
        <Cells.GenderCell>{patient.gender}</Cells.GenderCell>
      )}
      {address.isVisible && (
        <Cells.AddressCell>
          <p>{patient.address}</p>
          <p>
            {patient.city}, {patient.state} {patient.zipCode}
          </p>
        </Cells.AddressCell>
      )}
      {prescriptions.isVisible && (
        <Cells.PrescriptionsCell>
          {patient.prescription}
        </Cells.PrescriptionsCell>
      )}
    </Row>
  )
}

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
