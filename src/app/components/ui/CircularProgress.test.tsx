import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CircularProgress } from "./CircularProgress";

describe("CircularProgress", () => {
  test("renderiza com valores padrão", () => {
    render(<CircularProgress progress={50} />);

    expect(screen.getByText("50%")).toBeInTheDocument();

    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("width", "98");
    expect(svg).toHaveAttribute("height", "98");

    const circles = document.querySelectorAll("circle");
    expect(circles.length).toBe(2);
    expect(circles[0]).toHaveAttribute("stroke", "#1F2937");
    expect(circles[1]).toHaveAttribute("stroke", "#FBBF24");
  });

  test("limita o progresso entre 0 e 100", () => {
    const { rerender } = render(<CircularProgress progress={-20} />);
    expect(screen.getByText("0%")).toBeInTheDocument();

    rerender(<CircularProgress progress={150} />);
    expect(screen.getByText("100%")).toBeInTheDocument();

    rerender(<CircularProgress progress={75} />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  test("aceita tamanho personalizado", () => {
    render(<CircularProgress progress={50} size={200} />);

    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("width", "200");
    expect(svg).toHaveAttribute("height", "200");

    const text = screen.getByText("50%");
    expect(text).toHaveStyle("font-size: 50px");
  });

  test("aceita espessura de traço personalizada", () => {
    render(<CircularProgress progress={50} strokeWidth={10} />);

    const circles = document.querySelectorAll("circle");
    expect(circles[0]).toHaveAttribute("stroke-width", "10");
    expect(circles[1]).toHaveAttribute("stroke-width", "10");
  });

  test("aceita cores personalizadas", () => {
    render(
      <CircularProgress
        progress={50}
        progressColor="#FF5733"
        trackColor="#D3D3D3"
      />
    );

    const circles = document.querySelectorAll("circle");
    expect(circles[0]).toHaveAttribute("stroke", "#D3D3D3");
    expect(circles[1]).toHaveAttribute("stroke", "#FF5733");
  });

  test("calcula corretamente o raio e a circunferência", () => {
    render(<CircularProgress progress={50} size={100} strokeWidth={10} />);

    const circles = document.querySelectorAll("circle");
    const expectedRadius = (100 - 10) / 2;

    expect(circles[0]).toHaveAttribute("r", expectedRadius.toString());
    expect(circles[1]).toHaveAttribute("r", expectedRadius.toString());

    const circumference = 2 * Math.PI * expectedRadius;
    expect(circles[1]).toHaveAttribute(
      "stroke-dasharray",
      circumference.toString()
    );
  });

  test("calcula corretamente o deslocamento do traço baseado no progresso", () => {
    const size = 100;
    const strokeWidth = 10;
    const progress = 75;

    render(
      <CircularProgress
        progress={progress}
        size={size}
        strokeWidth={strokeWidth}
      />
    );

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const expectedOffset = circumference * (1 - progress / 100);

    const progressCircle = document.querySelectorAll("circle")[1];
    expect(progressCircle).toHaveAttribute(
      "stroke-dashoffset",
      expectedOffset.toString()
    );
  });

  test("possui estilo de texto correto", () => {
    render(<CircularProgress progress={50} size={120} />);

    const text = screen.getByText("50%");
    expect(text).toHaveAttribute("text-anchor", "middle");
    expect(text).toHaveAttribute("dominant-baseline", "central");
    expect(text).toHaveClass("fill-var(--text-default)");
    expect(text).toHaveClass("font-semibold");
    expect(text).toHaveStyle("font-size: 30px");
  });

  test("posiciona os elementos SVG corretamente", () => {
    const size = 150;
    render(<CircularProgress progress={50} size={size} />);

    const circles = document.querySelectorAll("circle");
    const centerPoint = size / 2;

    expect(circles[0]).toHaveAttribute("cx", centerPoint.toString());
    expect(circles[0]).toHaveAttribute("cy", centerPoint.toString());
    expect(circles[1]).toHaveAttribute("cx", centerPoint.toString());
    expect(circles[1]).toHaveAttribute("cy", centerPoint.toString());

    const text = screen.getByText("50%");
    expect(text).toHaveAttribute("x", "50%");
    expect(text).toHaveAttribute("y", "50%");
  });
});
