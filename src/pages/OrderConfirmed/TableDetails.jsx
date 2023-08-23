import React from 'react'
import { Table } from 'flowbite-react';

const TableDetails = ({details}) => {

    const cellStyle = "whitespace-nowrap font-medium text-gray-900 dark:text-primary dark:bg-[#222]";
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell colSpan={2} className='font-medium text-base dark:bg-primary-inverted-hover dark:text-primary-hover shadow-3xl'>
                    Shipping Details:
                </Table.HeadCell>

            </Table.Head>
            <Table.Body className="divide-y">
                <Table.Row className="bg-primary dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className={cellStyle}>
                        Full Name:
                    </Table.Cell>
                    <Table.Cell className={cellStyle}>
                        {details.shipping_details.fullName}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className={cellStyle}>
                        Postal Code:
                    </Table.Cell>
                    <Table.Cell className={cellStyle}>
                        {details.shipping_details.postalCode}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-primary dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className={cellStyle}>
                        Country Code:
                    </Table.Cell>
                    <Table.Cell className={cellStyle}>
                        {details.shipping_details.countryCode}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-primary dark:border-gray-700 dark:bg-gray-800" >
                    <Table.Cell className={cellStyle}>
                        City:
                    </Table.Cell>
                    <Table.Cell className={cellStyle}>
                        {details.shipping_details.city}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className={cellStyle}>
                        Address Line 1:
                    </Table.Cell>
                    <Table.Cell className={cellStyle}>
                        {details.shipping_details.addressLine1}
                    </Table.Cell>
                </Table.Row>
                {
                    details.shipping_details.addressLine2 &&
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className={cellStyle}>
                            Address Line 1:
                        </Table.Cell>
                        <Table.Cell className={cellStyle}>
                            {details.shipping_details.addressLine2}
                        </Table.Cell>
                    </Table.Row>}
            </Table.Body>
        </Table>
    )
}

export default TableDetails