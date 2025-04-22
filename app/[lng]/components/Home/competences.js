"use client";

import "../../globals.css";
import { useState } from "react";
import SkillsChart from "./skillsChart";

export default function SecondLine({ lng }) {

  return (
    <>
    <div className="w-full h-full screen pt-0">
        <SkillsChart />
    </div>
    </>
  );
}
