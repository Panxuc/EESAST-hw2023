using COSXML;
using COSXML.Auth;
using COSXML.Model.Object;
using COSXML.Model.Bucket;
using COSXML.CosException;
using COSXML.Model.Service;
using COSXML.Model.Tag;
using COSXML.Transfer;

class BucketTest
{
	//在这里补全你的信息
	static string bucket = "***";
	static string appid = "***";
	static string region = "***";
	static string secretId = "***";
	static string secretKey = "***";

	//获取存储桶列表
	public static void GetBucketList()
	{

		CosXmlConfig config = new CosXmlConfig.Builder()
		  .IsHttps(true)  //设置默认 HTTPS 请求
		  .SetRegion(region)  //设置一个默认的存储桶地域
		  .SetDebugLog(true)  //显示日志
		  .Build();  //创建 CosXmlConfig 对象
		long durationSecond = 600;  //每次请求签名有效时长，单位为秒
		QCloudCredentialProvider cosCredentialProvider = new DefaultQCloudCredentialProvider(secretId, secretKey, durationSecond);
		CosXmlServer cosXml = new CosXmlServer(config, cosCredentialProvider);


		try
		{
			GetServiceRequest request = new GetServiceRequest();
			//执行请求
			GetServiceResult result = cosXml.GetService(request);
			//得到所有的 buckets
			List<ListAllMyBuckets.Bucket> allBuckets = result.listAllMyBuckets.buckets;
			foreach (var bucket in allBuckets)
			{
				Console.WriteLine(bucket.name);
			}
		}
		catch (COSXML.CosException.CosClientException clientEx)
		{
			//请求失败
			Console.WriteLine("CosClientException: " + clientEx);
		}
		catch (COSXML.CosException.CosServerException serverEx)
		{
			//请求失败
			Console.WriteLine("CosServerException: " + serverEx.GetInfo());
		}
	}

	/// <summary>
	/// 上传对象
	/// </summary>
	/// <param name="cosPath">对象在存储桶中的位置标识符，即称对象键</param>
	/// <param name="srcPath">本地文件绝对路径</param>
	async public static void UploadCos(string? cosPath, string? srcPath)
	{
		CosXmlConfig config = new CosXmlConfig.Builder()
		  .IsHttps(true)  //设置默认 HTTPS 请求
		  .SetRegion(region)  //设置一个默认的存储桶地域
		  .SetDebugLog(true)  //显示日志
		  .Build();  //创建 CosXmlConfig 对象
		long durationSecond = 600;  //每次请求签名有效时长，单位为秒
		QCloudCredentialProvider cosCredentialProvider = new DefaultQCloudCredentialProvider(secretId, secretKey, durationSecond);
		CosXmlServer cosXml = new CosXmlServer(config, cosCredentialProvider);


		// 初始化 TransferConfig
		TransferConfig transferConfig = new TransferConfig();

		// 初始化 TransferManager
		TransferManager transferManager = new TransferManager(cosXml, transferConfig);

		// 上传对象
		COSXMLUploadTask uploadTask = new COSXMLUploadTask(bucket, cosPath);
		uploadTask.SetSrcPath(srcPath);


		uploadTask.progressCallback = delegate (long completed, long total)
		{
			Console.WriteLine(string.Format("progress = {0:##.##}%", completed * 100.0 / total));
		};


		try
		{
			COSXML.Transfer.COSXMLUploadTask.UploadTaskResult result = await
			  transferManager.UploadAsync(uploadTask);
			Console.WriteLine(result.GetResultInfo());
			string eTag = result.eTag;
		}
		catch (Exception e)
		{
			Console.WriteLine("CosException: " + e);
		}
	}

	//获取对象列表
	public static void GetObject()
	{
		CosXmlConfig config = new CosXmlConfig.Builder()
		  .IsHttps(true)  //设置默认 HTTPS 请求
		  .SetRegion(region)  //设置一个默认的存储桶地域
		  .SetDebugLog(true)  //显示日志
		  .Build();  //创建 CosXmlConfig 对象
		long durationSecond = 600;  //每次请求签名有效时长，单位为秒
		QCloudCredentialProvider cosCredentialProvider = new DefaultQCloudCredentialProvider(secretId, secretKey, durationSecond);
		CosXmlServer cosXml = new CosXmlServer(config, cosCredentialProvider);

		try
		{
			GetBucketRequest request = new GetBucketRequest(bucket);
			//执行请求
			GetBucketResult result = cosXml.GetBucket(request);
			//bucket的相关信息
			ListBucket info = result.listBucket;
			var content = info.contentsList;
			foreach (var item in content)
			{
				Console.WriteLine(item.key);        //打印对象键
			}
		}
		catch (COSXML.CosException.CosClientException clientEx)
		{
			//请求失败
			Console.WriteLine("CosClientException: " + clientEx);
		}
		catch (COSXML.CosException.CosServerException serverEx)
		{
			//请求失败
			Console.WriteLine("CosServerException: " + serverEx.GetInfo());
		}
	}

	/// <summary>
	/// 下载对象
	/// </summary>
	/// <param name="cosPath">对象在存储桶中的位置标识符，即称对象键</param>
	/// <param name="localDir">本地文件绝对路径(不含文件名)</param>
	/// <param name="localFileName">本地保存的文件名</param>
	async public static void DownloadObject(string? cosPath, string? localDir, string? localFileName)
	{
		CosXmlConfig config = new CosXmlConfig.Builder()
		  .IsHttps(true)  //设置默认 HTTPS 请求
		  .SetRegion(region)  //设置一个默认的存储桶地域
		  .SetDebugLog(true)  //显示日志
		  .Build();  //创建 CosXmlConfig 对象
		long durationSecond = 600;  //每次请求签名有效时长，单位为秒
		QCloudCredentialProvider cosCredentialProvider = new DefaultQCloudCredentialProvider(secretId, secretKey, durationSecond);
		CosXmlServer cosXml = new CosXmlServer(config, cosCredentialProvider);


		// 初始化 TransferConfig
		TransferConfig transferConfig = new TransferConfig();

		// 初始化 TransferManager
		TransferManager transferManager = new TransferManager(cosXml, transferConfig);

		// 下载对象
		COSXMLDownloadTask downloadTask = new COSXMLDownloadTask(bucket, cosPath,
		  localDir, localFileName);


		downloadTask.progressCallback = delegate (long completed, long total)
		{
			Console.WriteLine(string.Format("progress = {0:##.##}%", completed * 100.0 / total));
		};


		try
		{
			COSXML.Transfer.COSXMLDownloadTask.DownloadTaskResult result = await
			  transferManager.DownloadAsync(downloadTask);
			Console.WriteLine(result.GetResultInfo());
			string eTag = result.eTag;
		}
		catch (Exception e)
		{
			Console.WriteLine("CosException: " + e);
		}
	}

	/// <summary>
	/// 删除对象
	/// </summary>
	/// <param name="key">对象在存储桶中的位置标识符，即称对象键</param>
	public static void DeleteObject(string? key)
	{
		CosXmlConfig config = new CosXmlConfig.Builder()
		  .IsHttps(true)  //设置默认 HTTPS 请求
		  .SetRegion(region)  //设置一个默认的存储桶地域
		  .SetDebugLog(true)  //显示日志
		  .Build();  //创建 CosXmlConfig 对象
		long durationSecond = 600;  //每次请求签名有效时长，单位为秒
		QCloudCredentialProvider cosCredentialProvider = new DefaultQCloudCredentialProvider(secretId, secretKey, durationSecond);
		CosXmlServer cosXml = new CosXmlServer(config, cosCredentialProvider);

		try
		{
			DeleteObjectRequest request = new DeleteObjectRequest(bucket, key);
			//执行请求
			DeleteObjectResult result = cosXml.DeleteObject(request);
			//请求成功
			Console.WriteLine(result.GetResultInfo());
		}
		catch (COSXML.CosException.CosClientException clientEx)
		{
			//请求失败
			Console.WriteLine("CosClientException: " + clientEx);
		}
		catch (COSXML.CosException.CosServerException serverEx)
		{
			//请求失败
			Console.WriteLine("CosServerException: " + serverEx.GetInfo());
		}
	}

	/// <summary>
	/// 上传文件夹
	/// </summary>
	/// <param name="cosPath">对象在存储桶中的位置标识符，即称对象键</param>
	/// <param name="srcPath">本地文件夹绝对路径</param>
	async public static void UploadFolder(string? cosPath, string? srcPath)
	{
		if (Directory.Exists(srcPath))
		{
			string[] files = Directory.GetFiles(srcPath);
			foreach (string file in files)
			{
				string fileName = file.Substring(file.LastIndexOf("\\") + 1);
				string cosFilePath = cosPath + fileName;
				UploadCos(cosFilePath, file);
			}
		}
		else
		{
			Console.WriteLine("Folder does not exist");
		}
	}

	/// <summary>
	/// 下载文件夹
	/// </summary>
	/// <param name="cosPath">对象在存储桶中的位置标识符，即称对象键</param>
	/// <param name="localDir">本地文件夹绝对路径(不含文件名)</param>
	/// <param name="localFileName">本地保存的文件名</param>
	async public static void DownloadFolder(string? cosPath, string? localDir)
	{
		CosXmlConfig config = new CosXmlConfig.Builder()
		  .IsHttps(true)  //设置默认 HTTPS 请求
		  .SetRegion(region)  //设置一个默认的存储桶地域
		  .SetDebugLog(true)  //显示日志
		  .Build();  //创建 CosXmlConfig 对象
		long durationSecond = 600;  //每次请求签名有效时长，单位为秒
		QCloudCredentialProvider cosCredentialProvider = new DefaultQCloudCredentialProvider(secretId, secretKey, durationSecond);
		CosXmlServer cosXml = new CosXmlServer(config, cosCredentialProvider);

		try
		{
			GetBucketRequest request = new GetBucketRequest(bucket);
			//执行请求
			GetBucketResult result = cosXml.GetBucket(request);
			//bucket的相关信息
			ListBucket info = result.listBucket;
			var content = info.contentsList;
			foreach (var item in content)
			{
				if (item.key.StartsWith(cosPath + "/"))
				{
					DownloadObject(item.key, localDir, item.key.Substring(item.key.LastIndexOf("/") + 1));
				}
			}
		}
		catch (COSXML.CosException.CosClientException clientEx)
		{
			//请求失败
			Console.WriteLine("CosClientException: " + clientEx);
		}
		catch (COSXML.CosException.CosServerException serverEx)
		{
			//请求失败
			Console.WriteLine("CosServerException: " + serverEx.GetInfo());
		}
	}

	public static void Main()
	{
		while (true)
		{
			Console.WriteLine("1.获取存储桶列表\n2.上传对象\n3.上传文件夹\n4.查询对象列表\n5.下载对象\n6.下载文件夹\n7.删除对象\n8.退出");
			string? opt = Console.ReadLine();
			if (opt == "1")
			{
				GetBucketList();
			}
			else if (opt == "2")
			{
				Console.WriteLine("文件本地绝对路径：");
				string? localPath = Console.ReadLine();
				Console.WriteLine("COS路径：");
				string? cosPath = Console.ReadLine();
				UploadCos(cosPath, localPath);
			}
			else if (opt == "3")
			{
				Console.WriteLine("文件夹本地绝对路径：");
				string? localPath = Console.ReadLine();
				Console.WriteLine("COS路径：");
				string? cosPath = Console.ReadLine();
				UploadFolder(cosPath, localPath);
			}
			else if (opt == "4")
			{
				GetObject();
			}
			else if (opt == "5")
			{
				Console.WriteLine("下载的对象键：");
				string? cosPath = Console.ReadLine();
				Console.WriteLine("本地路径：");
				string? localDir = Console.ReadLine();
				Console.WriteLine("要保存的文件名：");
				string? localFileName = Console.ReadLine();
				DownloadObject(cosPath, localDir, localFileName);
			}
			else if (opt == "6")
			{
				Console.WriteLine("下载的对象键：");
				string? cosPath = Console.ReadLine();
				Console.WriteLine("本地路径：");
				string? localDir = Console.ReadLine();
				DownloadFolder(cosPath, localDir);
			}
			else if (opt == "7")
			{
				Console.WriteLine("删除的对象键：");
				string? key = Console.ReadLine();
				DeleteObject(key);
			}
			else if (opt == "8")
			{
				break;
			}
		}
	}
}