import Calculator_pb2
import Calculator_pb2_grpc

import grpc
import time
from concurrent import futures

class CalculatorServicer(Calculator_pb2_grpc.CalculateServicer):
    def Calculate(self, request, context):
        if request.op == Calculator_pb2.Operation.ADD:
            result = request.num1 + request.num2
        elif request.op == Calculator_pb2.Operation.SUB:
            result = request.num1 - request.num2
        elif request.op == Calculator_pb2.Operation.PRODUCT:
            result = request.num1 * request.num2
        elif request.op == Calculator_pb2.Operation.DIVIDE:
            if request.num2 == 0:	# Divide by zero
                context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
                context.set_details("Division by zero")
                return Calculator_pb2.Reply()
            result = request.num1 // request.num2
        else:
            context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
            context.set_details("Invalid operation")
            return Calculator_pb2.Reply()

        time.sleep(0.05)
        return Calculator_pb2.Reply(result=result)

    def StreamCalculate(self, request_iterator, context):
        for request in request_iterator:
            if request.op == Calculator_pb2.Operation.ADD:
                result = request.num1 + request.num2
            elif request.op == Calculator_pb2.Operation.SUB:
                result = request.num1 - request.num2
            elif request.op == Calculator_pb2.Operation.PRODUCT:
                result = request.num1 * request.num2
            elif request.op == Calculator_pb2.Operation.DIVIDE:
                if request.num2 == 0:	# Divide by zero
                    context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
                    context.set_details("Division by zero")
                    break
                result = request.num1 // request.num2
            else:
                context.set_code(grpc.StatusCode.INVALID_ARGUMENT)
                context.set_details("Invalid operation")
                break

            time.sleep(0.05)
            yield Calculator_pb2.Reply(result=result)

server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))

Calculator_pb2_grpc.add_CalculateServicer_to_server(CalculatorServicer(), server)

server.add_insecure_port('[::]:50051')
server.start()
print("Server started, listening on port 50051.")

# Shut down by Ctrl+C
try:
    while True:
        time.sleep(114514)
except KeyboardInterrupt:
    server.stop(0)
