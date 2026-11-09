import pino from "pino";

// Writes single-line JSON to stdout. When the app is started with the
// OpenTelemetry auto-instrumentation (see `start:otel` / `start:dist:otel`),
// the pino instrumentation also forwards every record to the OTLP log
// exporter, with trace_id/span_id of the active request attached.
export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
});
