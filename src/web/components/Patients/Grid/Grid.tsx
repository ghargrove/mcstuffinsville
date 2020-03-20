import React from 'react'

import { IPatient } from '../../../../server/store'
import { IPatientSort } from '../../../../server/resolvers/patient'
import useFieldVisibility from '../../../hooks/useFieldVisibility'
import { SecondaryText } from '../../Generic'
import Scroll from '../../Scroll'
import SortSelect from '../../SortSelect'
import * as Cells from './Cells'
import { ErrorRow, LoadingRow, NoDataRow, Row, SortRow } from './Row'

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
      {lastName.isVisible && <Cells.LastNameCell>Last name</Cells.LastNameCell>}
      {firstName.isVisible && (
        <Cells.FirstNameCell>First name</Cells.FirstNameCell>
      )}
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
    <Row data-patient-id={patient.id}>
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
  onGetMoreData: () => void
  onPatientSort: (sort: IPatientSort) => void
  patients: IPatient[]
  sort: IPatientSort
  totalPatientCount: number
}

const PatientGrid: React.FC<IPatientGridProps> = ({
  error,
  onGetMoreData,
  onPatientSort,
  loading,
  patients,
  totalPatientCount,
  sort
}) => {
  return (
    <Scroll onBoundaryReached={onGetMoreData}>
      <SortRow>
        <SortSelect onSortChange={onPatientSort} sort={sort} />
        <SecondaryText small>
          Showing {totalPatientCount} patients
        </SecondaryText>
      </SortRow>
      <Header />
      {loading && <LoadingRow />}
      {error && <ErrorRow />}
      {patients.length === 0 && <NoDataRow />}
      {!loading &&
        !error &&
        patients.map((p, i) => <DataRow key={i} patient={p} />)}
    </Scroll>
  )
}

export default PatientGrid
