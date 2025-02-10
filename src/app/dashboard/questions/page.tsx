"use client";
import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaArrowDown } from "react-icons/fa6";
import { IoArrowBackSharp } from "react-icons/io5";
import { Ticket } from "@/app/types/questions-types/QuestionsTypes";
import Link from "next/link";

const generateInitialTickets = (): Ticket[] => {
  const initialTickets: Ticket[] = [];
  for (let i = 2609; i >= 2550; i--) {
    initialTickets.push({
      id: `DESK-${i}`,
      title:
        i === 2609
          ? "link life time"
          : i === 2599
          ? "Migration Steps"
          : i === 2588
          ? "Voice note is not working in the app"
          : i === 2575
          ? "Connecting the users to my CRM"
          : i === 2499
          ? "requesting features"
          : i === 2497
          ? "limit the user input"
          : i === 2494
          ? "apk file for huawei phone"
          : i === 2488
          ? "Notifications in androide don't work"
          : i === 2487
          ? "Another issue"
          : i === 2486
          ? "Yet Another issue"
          : i === 2485
          ? "And Another issue"
          : `Ticket ${i}`, 
      reporter: "Mohammad Agent",
      status: "Closed", 
      createdAt:
        i === 2609
          ? "08-Jan-25,09:59 AM"
          : i === 2599
          ? "04-Jan-25,09:48 PM"
          : i === 2588
          ? "25-Dec-24,04:46 PM"
          : i === 2575
          ? "20-Dec-24,11:41 AM"
          : i === 2499
          ? "28-Nov-24,07:40 PM"
          : i === 2497
          ? "28-Nov-24,12:12 PM"
          : i === 2494
          ? "27-Nov-24,12:49 PM"
          : i === 2488
          ? "25-Nov-24,10:32 AM"
          : i === 2487
          ? "24-Nov-24,10:32 AM"
          : i === 2486
          ? "23-Nov-24,10:32 AM"
          : i === 2485
          ? "22-Nov-24,10:32 AM"
          : new Date(2024, 10, 28 - (2609 - i)).toLocaleString(), 
    });
  }
  return initialTickets;
};

function SupportTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(generateInitialTickets());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ticketsPerPage, setTicketsPerPage] = useState<number>(20); // Start with 20 per page
  const [isCreateTicketDialogOpen, setIsCreateTicketDialogOpen] =
    useState<boolean>(false);
  const [newTicket, setNewTicket] = useState<Partial<Ticket>>({
    title: "",
    reporter: "",
    status: "Open",
  });

  // --- Pagination ---
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // --- Create Ticket Handlers ---
  const openCreateTicketDialog = () => {
    setNewTicket({ title: "", reporter: "", status: "Open" });
    setIsCreateTicketDialogOpen(true);
  };

  const closeCreateTicketDialog = () => {
    setIsCreateTicketDialogOpen(false);
  };

  const handleCreateTicketChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTicketSubmit = () => {
    const newId = `DESK-${2609 + tickets.length + 1}`; // increasing ID i should replace with json file
    const createdAt =
      new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      }) +
      "," +
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    const createdTicket: Ticket = {
      id: newId,
      title: newTicket.title || "",
      reporter: newTicket.reporter || "",
      status: newTicket.status || "Open",
      createdAt: createdAt,
    };
    setTickets((prevTickets) => [createdTicket, ...prevTickets]);
    closeCreateTicketDialog(); 
  };

  // Prevent Body Scroll i can replace it in future and use tailwind instead 
  useEffect(() => {
    if (isCreateTicketDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCreateTicketDialogOpen]);

  return (
    <div className="p-4">
      {/*Back Section */}
      <div className="cursor-pointer mb-2 text-gray-600 font-semibold hover:text-gray-800">
        <Link href={"./"}>
          <IoArrowBackSharp className="inline-block ml-1" /> back
        </Link>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Support Tickets</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openCreateTicketDialog}
        >
          Create Ticket
        </button>
      </div>

      {/* Table Container with Fixed Height and Scroll */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ticket ID <FaArrowDown className="inline-block ml-1" />
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reporter
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                        {ticket.reporter.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {ticket.reporter}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ticket.status === "Open"
                        ? "bg-green-100 text-green-800"
                        : ticket.status === "Closed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ticket.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          Rows per page:
          <select
            value={ticketsPerPage}
            onChange={(e) => setTicketsPerPage(parseInt(e.target.value, 10))}
            className="ml-2 border rounded p-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div>
          {indexOfFirstTicket + 1}-{Math.min(indexOfLastTicket, tickets.length)}{" "}
          of {tickets.length}
        </div>
        <div className="flex">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-l disabled:opacity-50"
          >
            {"<"}
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastTicket >= tickets.length}
            className="px-3 py-1 border rounded-r disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      </div>

      {/* Create Ticket Dialog */}
      <Transition.Root show={isCreateTicketDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeCreateTicketDialog}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xs">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Create Ticket
                        </Dialog.Title>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="title"
                            value={newTicket.title}
                            onChange={handleCreateTicketChange}
                            placeholder="Ticket Title"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                          <input
                            type="text"
                            name="reporter"
                            value={newTicket.reporter}
                            onChange={handleCreateTicketChange}
                            placeholder="Reporter Name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                          <select
                            name="status"
                            value={newTicket.status}
                            onChange={handleCreateTicketChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={handleCreateTicketSubmit}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={closeCreateTicketDialog}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default SupportTickets;
