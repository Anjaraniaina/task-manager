import Head from "next/head";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import {GetServerSideProps} from "next";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (serverTime: Date, clientTime: Date) => {
  let difference = serverTime.getTime() - clientTime.getTime();
  let days = Math.ceil(difference / (1000 * 3600 * 24));
  let hours = Math.ceil(difference / (1000 * 3600));
  let minutes = Math.ceil(difference / (1000 * 60));
  let seconds = Math.ceil(difference / (1000));
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds}`;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const currentDate = new Date();

  return {
    props: {
      serverTime: currentDate.toISOString(),
    },
  };
};

// create interface to type props
interface HomeProps {
  serverTime: string;
}
// function to format the date
const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export default function Home({serverTime}: HomeProps) {
  const [clientTime, setClientTime] = useState(new Date());
  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  }

  const timeDifference = calculateTimeDifference(new Date(serverTime), clientTime);

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          <p>
            Server time:{" "}
            <span className="serverTime">{formatDate(new Date(serverTime))}</span>
          </p>

          {timeDifference}
          <p>
            Time diff:{" "}
            <span className="serverTime">{formatDate(clientTime)}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
