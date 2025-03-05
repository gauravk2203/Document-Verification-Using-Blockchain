import React, { useState } from "react";
import "./LandingComponent.css";

export default function HeroElement() {
  const [activeCard, setActiveCard] = useState("verification");

  const tabs = [
    { id: "verification", label: "Verification" },
    { id: "Institute", label: "Institute" },
    { id: "student", label: "Student" },
  ];

  const cards = {
    verification: {
      title: "Document Verification",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, ducimus quidem eaque autem soluta obcaecati! Esse sed ducimus maiores optio doloribus recusandae dignissimos consequatur est, quia molestiae dolores, illo vero.",
    },
    Institute: {
      title: "Institute",
      description:
        "Institutes can securely upload and verify student documents on the platform.",
    },
    student: {
      title: "Student",
      description:
        "Students can access, manage, and share verified documents with ease.",
    },
  };

  return (
    <main>
      <div className="upperContainer">
        <div className="heading">
          <h1>
            The <span className="textcolor">New Era</span> of Document Management
          </h1>
        </div>
        <div className="subheading">
          <p>
            Etheregg is an Ethereum-based document verification and storage platform on a
            distributed ledger for students, universities & verifiers.
          </p>
        </div>
      </div>

      <div className="option_container">
        <div className="navbar">
          <ul>
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={activeCard === tab.id ? "activeCard" : ""}
                onClick={() => setActiveCard(tab.id)}
                onKeyDown={(e) => e.key === "Enter" && setActiveCard(tab.id)}
                role="button"
                tabIndex={0}
                aria-pressed={activeCard === tab.id}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="card_container">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`card ${tab.id}-card ${activeCard === tab.id ? "activeCard" : ""}`}
            >
              <li>{cards[tab.id].title}</li>
              <p>{cards[tab.id].description}</p>
              <button>Upload Now</button>
              <span></span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
