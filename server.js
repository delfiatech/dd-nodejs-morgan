var express = require('express');
var morgan = require('morgan')
const json = require('morgan-json');
const tracer = require('dd-trace').init();
var app = express();

const format = json(':date[iso] :trace_id :span_id :method :url :status :res[content-length] bytes :response-time ms');
app.use(morgan(format))

morgan.token('trace_id', function getTraceId (req) {
    const span = tracer.scope().active();
    if (span) {
        return span.context().toTraceId()
    }else{
        return ""
    }
})

morgan.token('span_id', function getSpanId (req) {
    const span = tracer.scope().active();
    if (span) {
        return span.context().toSpanId()
    }
    else{
        return ""
    }
})

app.get('/', function (req, res) {
  res.send('Hello World correlating logs and traces with Datadog!');
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});