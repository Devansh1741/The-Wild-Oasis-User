"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "../_context/ReservationContext";
import { createReservation } from "../_lib/actions";
import { useState } from "react";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  // CHANGE
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const { range, resetRange } = useReservation();
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
    hasBreakfast,
  };

  const createReservationWithData = createReservation.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between px-16 py-2 bg-primary-800 text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="flex flex-col gap-5 px-16 py-10 text-lg bg-primary-900"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="default-checkbox">Opt for breakfast</label>
          <input
            id="default-checkbox"
            type="checkbox"
            value={hasBreakfast}
            onClick={() => setHasBreakfast((b) => !b)}
            className="w-6 h-6 accent-primary-200"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          {!(startDate && endDate) ? (
            <p className="text-base text-primary-300">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton
              pendingText="Reserving Now"
              notPendinText="Reserve Now"
              className="px-8 py-4 font-semibold transition-all bg-accent-500 text-primary-800 hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
