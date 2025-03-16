import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const userTypes = {
  ADMIN: 'admin',
  CUSTOMER: "customer",
  EMPLOYEE: "employee",
  HR_MANAGER: "hr manager",
  FINANCE_MANAGER: "finance manager",
  FLEET_MANAGER: "fleet manager",
  STOCK_MANAGER: "stock manager",
  SITE_MANAGER: "site manager",
  PROJECT_MANAGER: "project manager",
  CUSTOMER_RELATIONSHIP_MANAGER: "customer relationship manager",
  DRIVER: "driver",
  WORKER: "worker"
};

export const utilities = {
  WATER: 'Water',
  ELECTRICITY: "Electricity",
  MOBILE: "Mobile",
};

export const billerTypes = {
  SUPPLIER: 'Supplier',
  CONSULTANT: "Consultant",
  LEGAL: "Legal",
  INSURANCE: "Insurance",
};

export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const scrollPage = (position) => {
  window.scrollTo({
    top: position,
    behavior: 'smooth'
  });
};

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export function timedSuccessAlert(content) {
  Toast.fire({
    icon: "success",
    title: content
  });
}

export function errorAlert(content) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: content,
    confirmButtonColor: "#ff5200"
  });
}

export function successAlert(content) {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: content,
    confirmButtonColor: "#ff5200"
  });
}

export function addRequestHeaders(token) {
  return (config) => {
    if (token) {
      config.headers['authorization'] = token;
    }
    return config;
  };
};

export function handleUnauthorized() {
  return (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = '/error'
    }
    return Promise.reject(error);
  };
}