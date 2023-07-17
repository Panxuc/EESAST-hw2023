using Grpc.Core;
using Calculator;
using System;
using System.Threading.Tasks;

namespace GrpcClient
{
	class Program
	{
		static async Task Main(string[] args)
		{
			var channel = new Channel("localhost:50051", ChannelCredentials.Insecure);  // Channel
			var client = new Calculate.CalculateClient(channel);                        // stub

			var request = new Request { Num1 = 114, Num2 = 514, Op = Operation.Add };
			var reply = await client.CalculateAsync(request);
			Console.WriteLine($"The result of {request.Num1} {request.Op} {request.Num2} is {reply.Result}");

			using (var call = client.StreamCalculate())
			{
				var requests = new[]
				{
					new Request { Num1 = 114, Num2 = 514, Op = Operation.Sub },
					new Request { Num1 = 114, Num2 = 514, Op = Operation.Product },
					new Request { Num1 = 114, Num2 = 514, Op = Operation.Divide }
				};

				foreach (var r in requests)
				{
					await Task.Delay(100);
					await call.RequestStream.WriteAsync(r);
					Console.WriteLine($"Sent request: {r.Num1} {r.Op} {r.Num2}");
				}

				await call.RequestStream.CompleteAsync();

				while (await call.ResponseStream.MoveNext())
				{
					var response = call.ResponseStream.Current;
					Console.WriteLine($"Received response: {response.Result}");
				}
			}

			await channel.ShutdownAsync();
		}
	}
}
