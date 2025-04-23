"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
// Traductions pour les messages d'erreur, labels, et autres
const translations = {
  fr: {
    formTitle: "Contactez-moi",
    nameLabel: "Nom",
    emailLabel: "Email",
    messageLabel: "Message",
    submitButton: "Envoyer",
    closeButton: "Fermer",
    errors: {
      name: "Le nom est requis.",
      email: "L'email est requis.",
      emailInvalid: "L'email n'est pas valide.",
      message: "Le message est requis.",
    },
  },
  en: {
    formTitle: "Contact Me",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    submitButton: "Submit",
    closeButton: "Close",
    errors: {
      name: "Name is required.",
      email: "Email is required.",
      emailInvalid: "Invalid email address.",
      message: "Message is required.",
    },
  },
};

export default function ContactForm({ onClose, lng = "fr" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // Pour afficher le message de succès

  // Récupérer les traductions selon la langue active
  const { formTitle, nameLabel, emailLabel, messageLabel, submitButton, closeButton, errors: errorMessages } = translations[lng];

  // Fonction pour valider les champs avant l'envoi du formulaire
  const validateForm = () => {
    const newErrors = {};

    // Validation du nom
    if (!name) newErrors.name = errorMessages.name;

    // Validation de l'email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = errorMessages.email;
    } else if (!emailRegex.test(email)) {
      newErrors.email = errorMessages.emailInvalid;
    }

    // Validation du message
    if (!message) newErrors.message = errorMessages.message;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation du formulaire
    if (validateForm()) {
      // Utilisation de EmailJS pour envoyer l'email
      emailjs
        .send(
            serviceId,
            templateId,
          {
            name,
            email,
            message,
          },
          userId
        )
        .then(
          (response) => {
            console.log("Email envoyé avec succès :", response);
            setSuccessMessage("Votre message a été envoyé avec succès !"); // Afficher le message de succès
            setName("");
            setEmail("");
            setMessage("");
          },
          (error) => {
            console.error("Erreur lors de l'envoi de l'email :", error);
            setSuccessMessage("Une erreur est survenue. Veuillez réessayer."); // Afficher le message d'erreur
          }
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-form p-8 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">{formTitle}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block text-sm font-semibold mb-2 ${name ? "text-accent" : ""}`}
              htmlFor="name"
            >
              {nameLabel}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-light/20 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label
              className={`block text-sm font-semibold mb-2 ${email ? "text-accent" : ""}`}
              htmlFor="email"
            >
              {emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-light/20 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label
              className={`block text-sm font-semibold mb-2 ${message ? "text-accent" : ""}`}
              htmlFor="message"
            >
              {messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 bg-light/20 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              rows="4"
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full btn-primary hover:btn-primary-active"
          >
            {submitButton}
          </button>
        </form>

        {successMessage && (
          <p className="mt-4 text-green-500 text-sm">{successMessage}</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-light hover:text-accent"
        >
          {closeButton}
        </button>
      </div>
    </div>
  );
}
