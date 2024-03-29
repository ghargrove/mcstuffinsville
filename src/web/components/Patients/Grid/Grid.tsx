import React from 'react'

import { IPatient } from '../../../../server/store'
import useFieldVisibility from '../../../hooks/useFieldVisibility'

import * as Cells from './Cells'
import { ErrorRow, HeaderRow, LoadingRow, NoDataRow, Row } from './Row'

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
    <HeaderRow>
      {lastName.isVisible && (
        <Cells.LastNameCell header>Last name</Cells.LastNameCell>
      )}
      {firstName.isVisible && (
        <Cells.FirstNameCell header>First name</Cells.FirstNameCell>
      )}
      {email.isVisible && <Cells.EmailCell header>Email</Cells.EmailCell>}
      {gender.isVisible && <Cells.GenderCell header>Gender</Cells.GenderCell>}
      {address.isVisible && (
        <Cells.AddressCell header>Address</Cells.AddressCell>
      )}
      {prescriptions.isVisible && (
        <Cells.PrescriptionsCell header>Prescriptions</Cells.PrescriptionsCell>
      )}
    </HeaderRow>
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
    <Row highlight data-patient-id={patient.id}>
      {lastName.isVisible && (
        <Cells.LastNameCell>{patient.lastName}</Cells.LastNameCell>
      )}
      {firstName.isVisible && (
        <Cells.FirstNameCell>{patient.firstName}</Cells.FirstNameCell>
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
  error: boolean
  loading: boolean
  patients: IPatient[]
}

const PatientGrid: React.FC<IPatientGridProps> = ({
  error,
  loading,
  patients
}) => {
  return (
    <React.Fragment>
      <Header />
      {loading && <LoadingRow />}
      {error && <ErrorRow />}
      {!error && !loading && patients.length === 0 && <NoDataRow />}
      {!loading &&
        !error &&
        patients.map((p, i) => <DataRow key={i} patient={p} />)}
    </React.Fragment>
  )
}

export default PatientGrid
