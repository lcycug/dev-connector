import React from "react";
import * as moment from "moment";

export default function ExperienceTable({
  experiences = [],
  type = "Experience"
}) {
  return (
    <div>
      <div>
        <h4 className="mb-2">{type} Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>{type === "Experience" ? "Company" : "School"}</th>
              <th>{type === "Experience" ? "Title" : "Degree"}</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp, i) => (
              <tr key={i}>
                <td>{type === "Experience" ? exp.company : exp.school}</td>
                <td>{type === "Experience" ? exp.title : exp.degree}</td>
                <td>
                  {moment(exp.from).format("MMM D, YYYY")} -{" "}
                  {exp.current ? "Now" : moment(exp.to).format("MMM D, YYYY")}
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
