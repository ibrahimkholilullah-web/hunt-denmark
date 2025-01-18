import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loading from '../../Shared/Loading';
import ContextRepotable from './ContextRepotable';
import useSecureAxiose from '../../useSecureAxiose/useSecureAxiose';
import { Helmet } from 'react-helmet-async';

const ReportedContents = () => {
  const secureAxiose = useSecureAxiose()
    const { data: report = [], isLoading, refetch } = useQuery({
        queryKey: ['report'],
        queryFn: async () => {
            const { data } = await secureAxiose.get(`/report`);
            return data;
        }
    });

    if (isLoading) return <Loading></Loading>;

    return (
        <div>
                       <Helmet>
                          <title> HUND Denmark || Reportes Contents</title>
                        </Helmet>
            <div className='border-2 border-black m-2 rounded-xl'>
                <div className="overflow-x-auto">
                    {
                        report.length === 0 ? (
                            <div className="text-center p-4">
                                <p className="text-lg font-semibold">No Reports Found</p>
                            </div>
                        ) : (
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className='text-sm border-b-2 border-white text-center'>
                                        <th>NO</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Details</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        report.map((report, inx) => (
                                            <ContextRepotable
                                                refetch={refetch}
                                                inx={inx}
                                                key={report._id}
                                                report={report}
                                            ></ContextRepotable>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ReportedContents;
