USE [RealEstate]
GO
/****** Object:  Table [dbo].[Appointment]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Appointment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PropertyId] [int] NOT NULL,
	[BuilderId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[AvailabilityId] [int] NOT NULL,
	[AppointmentDate] [datetime] NOT NULL,
	[StartTime] [time](7) NULL,
	[EndTime] [time](7) NULL,
	[Status] [bit] NOT NULL,
	[CreatedAt] [datetime] NULL,
 CONSTRAINT [PK_Appointment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Builder]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Builder](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fname] [varchar](100) NULL,
	[lname] [varchar](100) NULL,
	[email] [varchar](255) NULL,
	[password] [varchar](255) NULL,
	[pincode] [bigint] NULL,
	[state] [varchar](24) NULL,
	[city] [varchar](24) NULL,
	[location] [varchar](100) NULL,
	[phoneNo] [varchar](20) NULL,
	[version] [int] NULL,
	[PhotoPath] [nvarchar](max) NULL,
 CONSTRAINT [PK__Builder__3213E83FC665B9D0] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[builder_availability]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[builder_availability](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[BuilderId] [int] NOT NULL,
	[AvailabilityDate] [date] NOT NULL,
	[StartTime] [time](7) NOT NULL,
	[EndTime] [time](7) NOT NULL,
	[Status] [bit] NOT NULL,
	[CreatedAt] [datetime] NULL,
 CONSTRAINT [PK_builder_availability] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[City]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NULL,
	[state_id] [int] NULL,
	[is_active] [bit] NULL,
	[created_on] [datetime] NULL,
 CONSTRAINT [PK__City__3213E83FF76F5EF6] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Menu]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Menu](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NULL,
	[title] [varchar](100) NULL,
	[icon] [varchar](100) NULL,
	[path] [varchar](255) NULL,
	[version] [int] NULL,
 CONSTRAINT [PK__Menu__3213E83FE9BA283A] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TransactionId] [nvarchar](50) NOT NULL,
	[Amount] [decimal](18, 2) NOT NULL,
	[PlanName] [nvarchar](100) NOT NULL,
	[FirstName] [nvarchar](200) NOT NULL,
	[Email] [nvarchar](100) NOT NULL,
	[Status] [nvarchar](20) NOT NULL,
	[PaymentGateway] [nvarchar](20) NULL,
	[PaymentDate] [datetime] NULL,
	[HashString] [nvarchar](512) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permission]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permission](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[roleId] [int] NOT NULL,
	[menuId] [int] NULL,
	[version] [int] NULL,
 CONSTRAINT [PK__Permissi__3213E83F370B3409] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Property]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Property](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[propertyFor] [varchar](20) NULL,
	[isSociety] [bit] NULL,
	[status] [varchar](50) NULL,
	[isActive] [bit] NULL,
	[images] [nvarchar](max) NULL,
	[updatedOn] [datetime] NULL,
	[createdOn] [datetime] NULL,
	[price] [decimal](10, 2) NULL,
	[length] [int] NULL,
	[breadth] [int] NULL,
	[stateId] [int] NULL,
	[cityId] [int] NULL,
	[pincode] [varchar](10) NULL,
	[locality] [varchar](255) NULL,
	[societyName] [varchar](255) NULL,
	[flatNo] [varchar](50) NULL,
	[description] [text] NULL,
	[address] [text] NULL,
	[email] [varchar](255) NULL,
	[phoneNo] [varchar](20) NULL,
	[title] [varchar](255) NULL,
	[userId] [int] NULL,
	[slug] [varchar](255) NULL,
	[typeId] [int] NULL,
	[imgPath] [varchar](255) NULL,
	[cornerPlot] [bit] NULL,
	[builderId] [int] NULL,
	[version] [int] NULL,
	[agencyName] [varchar](100) NULL,
 CONSTRAINT [PK__Property__3213E83F31A18A3B] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PropertyOriginal]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PropertyOriginal](
	[id] [int] NOT NULL,
	[title] [varchar](255) NULL,
	[type] [varchar](100) NULL,
	[is_active] [bit] NULL,
 CONSTRAINT [PK__Property__3213E83F67E55751] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[version] [int] NULL,
 CONSTRAINT [PK__Roles__3213E83F208268C1] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[state]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[state](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](255) NOT NULL,
	[is_active] [bit] NULL,
	[created_on] [datetime] NULL,
 CONSTRAINT [PK__state__3213E83F6582B67A] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 05-10-2026 21:37:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userType] [int] NULL,
	[isAdmin] [bit] NULL,
	[status] [bit] NULL,
	[updatedOn] [datetime] NULL,
	[fname] [varchar](255) NOT NULL,
	[lname] [varchar](255) NOT NULL,
	[userName] [varchar](255) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[phoneNo] [varchar](20) NULL,
	[state_id] [int] NULL,
	[city_id] [int] NULL,
	[pincode] [int] NULL,
	[role] [varchar](50) NULL,
	[createdOn] [datetime] NULL,
	[password] [varchar](255) NOT NULL,
	[PhotoPath] [nvarchar](max) NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Appointment] ON 
GO
INSERT [dbo].[Appointment] ([Id], [PropertyId], [BuilderId], [UserId], [AvailabilityId], [AppointmentDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (15, 1038, 33, 2, 19, CAST(N'2026-09-20T00:00:00.000' AS DateTime), CAST(N'20:21:00' AS Time), CAST(N'21:21:00' AS Time), 1, CAST(N'2026-09-19T20:13:32.633' AS DateTime))
GO
INSERT [dbo].[Appointment] ([Id], [PropertyId], [BuilderId], [UserId], [AvailabilityId], [AppointmentDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (16, 1038, 33, 27, 20, CAST(N'2026-09-21T00:00:00.000' AS DateTime), CAST(N'21:25:00' AS Time), CAST(N'22:25:00' AS Time), 1, CAST(N'2026-09-20T20:26:12.983' AS DateTime))
GO
INSERT [dbo].[Appointment] ([Id], [PropertyId], [BuilderId], [UserId], [AvailabilityId], [AppointmentDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (17, 1038, 33, 27, 21, CAST(N'2026-09-24T00:00:00.000' AS DateTime), CAST(N'23:14:00' AS Time), CAST(N'23:16:00' AS Time), 1, CAST(N'2026-09-23T22:13:45.017' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Appointment] OFF
GO
SET IDENTITY_INSERT [dbo].[Builder] ON 
GO
INSERT [dbo].[Builder] ([id], [fname], [lname], [email], [password], [pincode], [state], [city], [location], [phoneNo], [version], [PhotoPath]) VALUES (1, N'builder1', N'builder1', N'builder1@gmail.com', N'Asdfg@12#', 12345, NULL, NULL, N'tttttt', N'4569871378', NULL, N'/uploads/builders/853b016c-e916-4652-ad77-5f11d80a2a0f.png')
GO
INSERT [dbo].[Builder] ([id], [fname], [lname], [email], [password], [pincode], [state], [city], [location], [phoneNo], [version], [PhotoPath]) VALUES (2, N'piyu', N'tandan', N'piyu@gmail.com', N'Asdfg@12#', 69854, NULL, NULL, N'location12', N'2874692153', NULL, N'/uploads/builders/e1c93d99-825f-4f14-a5d8-80ab69cd470e.png')
GO
SET IDENTITY_INSERT [dbo].[Builder] OFF
GO
SET IDENTITY_INSERT [dbo].[builder_availability] ON 
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (4, 31, CAST(N'2026-08-11' AS Date), CAST(N'21:46:00' AS Time), CAST(N'22:47:00' AS Time), 1, CAST(N'2026-08-10T15:18:19.333' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (5, 2, CAST(N'2026-08-14' AS Date), CAST(N'19:33:00' AS Time), CAST(N'20:33:00' AS Time), 1, CAST(N'2026-08-14T14:03:57.020' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (6, 2, CAST(N'2026-08-14' AS Date), CAST(N'19:33:00' AS Time), CAST(N'20:33:00' AS Time), 1, CAST(N'2026-08-14T14:03:57.020' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (9, 33, CAST(N'2026-08-15' AS Date), CAST(N'07:35:00' AS Time), CAST(N'08:35:00' AS Time), 1, CAST(N'2026-08-14T14:05:51.970' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (10, 2, CAST(N'2026-09-10' AS Date), CAST(N'19:14:00' AS Time), CAST(N'22:17:00' AS Time), 1, CAST(N'2026-09-11T13:44:20.567' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (11, 2, CAST(N'2026-09-14' AS Date), CAST(N'20:34:00' AS Time), CAST(N'21:35:00' AS Time), 1, CAST(N'2026-09-13T15:05:03.680' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (12, 33, CAST(N'2026-09-14' AS Date), CAST(N'20:39:00' AS Time), CAST(N'21:40:00' AS Time), 1, CAST(N'2026-09-13T15:09:40.037' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (13, 2, CAST(N'2026-09-18' AS Date), CAST(N'12:24:00' AS Time), CAST(N'13:25:00' AS Time), 1, CAST(N'2026-09-17T06:54:59.700' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (14, 2, CAST(N'2026-09-18' AS Date), CAST(N'12:24:00' AS Time), CAST(N'13:25:00' AS Time), 1, CAST(N'2026-09-17T06:54:59.700' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (15, 2, CAST(N'2026-09-18' AS Date), CAST(N'12:24:00' AS Time), CAST(N'13:25:00' AS Time), 1, CAST(N'2026-09-17T06:54:59.700' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (16, 2, CAST(N'2026-09-18' AS Date), CAST(N'12:24:00' AS Time), CAST(N'13:25:00' AS Time), 1, CAST(N'2026-09-17T06:54:59.700' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (17, 2, CAST(N'2026-09-18' AS Date), CAST(N'12:24:00' AS Time), CAST(N'13:25:00' AS Time), 1, CAST(N'2026-09-17T06:54:59.700' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (18, 33, CAST(N'2026-09-18' AS Date), CAST(N'12:26:00' AS Time), CAST(N'13:26:00' AS Time), 1, CAST(N'2026-09-17T06:56:05.237' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (19, 33, CAST(N'2026-09-20' AS Date), CAST(N'20:21:00' AS Time), CAST(N'21:21:00' AS Time), 1, CAST(N'2026-09-19T13:50:40.263' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (20, 33, CAST(N'2026-09-21' AS Date), CAST(N'21:25:00' AS Time), CAST(N'22:25:00' AS Time), 0, CAST(N'2026-09-20T14:55:50.850' AS DateTime))
GO
INSERT [dbo].[builder_availability] ([id], [BuilderId], [AvailabilityDate], [StartTime], [EndTime], [Status], [CreatedAt]) VALUES (21, 33, CAST(N'2026-09-24' AS Date), CAST(N'23:14:00' AS Time), CAST(N'23:16:00' AS Time), 0, CAST(N'2026-09-23T16:43:26.630' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[builder_availability] OFF
GO
SET IDENTITY_INSERT [dbo].[City] ON 
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (1, N'surat', 1, 1, CAST(N'2025-02-23T14:30:00.000' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (2, N'Mumbai', 15, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (3, N'Pune', 15, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (4, N'Nagpur', 15, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (5, N'Nashik', 15, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (6, N'Jaipur', 22, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (7, N'Udaipur', 22, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (8, N'Jodhpur', 22, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (9, N'Kota', 22, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (10, N'Lucknow', 27, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (11, N'Kanpur', 27, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (12, N'Varanasi', 27, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (13, N'Agra', 27, 1, CAST(N'2025-03-22T10:43:07.170' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (14, N'Chennai', 24, 1, CAST(N'2025-03-22T10:43:07.173' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (15, N'Coimbatore', 24, 1, CAST(N'2025-03-22T10:43:07.173' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (16, N'Madurai', 24, 1, CAST(N'2025-03-22T10:43:07.173' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (17, N'Bengaluru', 12, 1, CAST(N'2025-03-22T10:43:07.173' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (18, N'Mysuru', 12, 1, CAST(N'2025-03-22T10:43:07.173' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (19, N'Hubli', 12, 1, CAST(N'2025-03-22T10:43:07.173' AS DateTime))
GO
INSERT [dbo].[City] ([id], [name], [state_id], [is_active], [created_on]) VALUES (20, N'New Delhi', NULL, 1, CAST(N'2025-03-22T10:43:07.173' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[City] OFF
GO
SET IDENTITY_INSERT [dbo].[Menu] ON 
GO
INSERT [dbo].[Menu] ([id], [name], [title], [icon], [path], [version]) VALUES (1, N'User', N'User', N'fa fa-user', N'users/user/list', 1)
GO
INSERT [dbo].[Menu] ([id], [name], [title], [icon], [path], [version]) VALUES (2, N'Permission', N'Permission', N'bi bi-eye-fill', N'permission/create', 1)
GO
INSERT [dbo].[Menu] ([id], [name], [title], [icon], [path], [version]) VALUES (3, N'Menu', N'Menu', N'bi bi-menu-down', N'menu1/new', 1)
GO
INSERT [dbo].[Menu] ([id], [name], [title], [icon], [path], [version]) VALUES (4, N'Role', N'Role', N'bi bi-gear', N'role/new', 1)
GO
INSERT [dbo].[Menu] ([id], [name], [title], [icon], [path], [version]) VALUES (6, N'Property', N'Property', N'bi bi-house-door-fill', N'property/list', 1)
GO
INSERT [dbo].[Menu] ([id], [name], [title], [icon], [path], [version]) VALUES (8, N'payment', N'Payment', N'bi bi-bank', N'payment/payment-list', NULL)
GO
INSERT [dbo].[Menu] ([id], [name], [title], [icon], [path], [version]) VALUES (10, N'Builder Availability', N'Builder Availability', N'bi bi-calendar-check', N'/builder-availability/availability', NULL)
GO
INSERT [dbo].[Menu] ([id], [name], [title], [icon], [path], [version]) VALUES (11, N'Availability List', N'Availibility List', N'bi bi-calendar-event', N'/builder-availability/availability-list', NULL)
GO
SET IDENTITY_INSERT [dbo].[Menu] OFF
GO
SET IDENTITY_INSERT [dbo].[Payments] ON 
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (5, N'42eb9b2c-0c4e-4dac-8dbc-98d6ad6a4b91', CAST(100000.00 AS Decimal(18, 2)), N'Residential in surat  gujarat', N'residential-in-surat-gujarat-a331b8c9-910b-4502-b19d-ac9a790f7d8d', N'heti@gmail.com', N'success', N'PayU', CAST(N'2025-04-06T16:46:09.730' AS DateTime), N'2e3202ea6167f7ab5a8ff5d7c83aa107ec2983fe81fe5762b2e3bf1e45b2330412739b8904d914a135a684e1a1b5feeeb63e0cdf92af707f0cafe5e3c267f563')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (6, N'e0b6b0db-fcca-41d2-a248-4552a9c9362f', CAST(100000.00 AS Decimal(18, 2)), N'Commercial in surat  gujarat', N'commercial-in-surat-gujarat-975a13ba-3112-4e71-bc9a-0120b77b6b72', N'heti@gmail.com', N'success', N'PayU', CAST(N'2025-04-06T18:27:24.220' AS DateTime), N'363d3e8224715f8f0c788b1d4d14fece5d1776b6d1ff2b931e38e7f788d0b70de2b49f679af73c20cced517cb4db489d4c02e5ae64c7f5061e848250915f91c7')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (7, N'0fe109e9-5c42-4093-8c92-2f809df8f539', CAST(200000.00 AS Decimal(18, 2)), N'Commercial in surat  gujarat', N'commercial-in-surat-gujarat-9ede1ec6-e8b0-42e6-9465-37153d4cb1c4', N'heti@gmail.com', N'success', N'PayU', CAST(N'2025-04-07T06:26:24.267' AS DateTime), N'b1908f657a7769bb46bcc6c3fbe6e845b90e3c977d3ce1690e6145bdbccc4a493210c40f9c64112e2644f1e1f971ed3c21659b0c2cf2e5490e4fc71de9ce04e5')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (8, N'0fe109e9-5c42-4093-8c92-2f809df8f539', CAST(200000.00 AS Decimal(18, 2)), N'Commercial in surat  gujarat', N'commercial-in-surat-gujarat-9ede1ec6-e8b0-42e6-9465-37153d4cb1c4', N'heti@gmail.com', N'success', N'PayU', CAST(N'2025-04-07T06:26:55.373' AS DateTime), N'b1908f657a7769bb46bcc6c3fbe6e845b90e3c977d3ce1690e6145bdbccc4a493210c40f9c64112e2644f1e1f971ed3c21659b0c2cf2e5490e4fc71de9ce04e5')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (9, N'f5478fed-c2b3-453b-b1fd-345b369bfe7f', CAST(200000.00 AS Decimal(18, 2)), N'Commercial in surat  gujarat', N'commercial-in-surat-gujarat-9ede1ec6-e8b0-42e6-9465-37153d4cb1c4', N'heti@gmail.com', N'success', N'PayU', CAST(N'2025-04-07T06:28:00.733' AS DateTime), N'b8f0b61368b1be80b4bfc4ef5777d551c9f7991e0ba0b804ea122bb2f1c8db8161750606b032cbf2b851c67107b7d3cca59d18005cfb2b2c5f1d6d7fc7e84db1')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (10, N'f5478fed-c2b3-453b-b1fd-345b369bfe7f', CAST(200000.00 AS Decimal(18, 2)), N'Commercial in surat  gujarat', N'commercial-in-surat-gujarat-9ede1ec6-e8b0-42e6-9465-37153d4cb1c4', N'heti@gmail.com', N'success', N'PayU', CAST(N'2025-04-07T06:28:14.537' AS DateTime), N'b8f0b61368b1be80b4bfc4ef5777d551c9f7991e0ba0b804ea122bb2f1c8db8161750606b032cbf2b851c67107b7d3cca59d18005cfb2b2c5f1d6d7fc7e84db1')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (11, N'c6f49325-0367-47e7-b028-08f7700ae53d', CAST(200000.00 AS Decimal(18, 2)), N'Commercial in surat  gujarat', N'commercial-in-surat-gujarat-9ede1ec6-e8b0-42e6-9465-37153d4cb1c4', N'heti@gmail.com', N'success', N'PayU', CAST(N'2025-04-07T06:29:49.173' AS DateTime), N'12be232c9f80932b454050851b78414018b947bc1e54f2f824ae819f0c9e853b02649204b02e13ec8c5ceb61c8f9c04d28d8d59cb9e0601a9faec3aa4de23927')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (12, N'b5364ccb-c7fc-42fb-8521-7211ee02494a', CAST(500000.00 AS Decimal(18, 2)), N'Commercial in surat  gujarat', N'commercial-in-surat-gujarat-4da20c8c-32e7-4463-b0a4-6fe8efab7beb', N'heti@gmail.com', N'success', N'PayU', CAST(N'2025-04-08T03:07:52.253' AS DateTime), N'8516b7fa79c938436685bf177570dfc636d6dd5567000aefb5b5e92158f6cbd301b50be81cf3125fa530f57a3d3e8613c625d882caa63e10555a7b04a9f90f85')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (13, N'ec542dad-d1f4-4283-a198-cc610d40cae7', CAST(560000.00 AS Decimal(18, 2)), N'Residential in surat  gujarat', N'residential-in-surat-gujarat-972d2408-49fb-4510-b700-a02b0856dab1', N'heti@gmail.com', N'success', N'PayU', CAST(N'2025-04-08T04:47:04.260' AS DateTime), N'2f6c6ad1db4a3d5390559a20186aed3db390512c8213b48222d6b945598632996ead178de290c177d4c8e168ddb36ade89440d66f50f7f2c1dc5b1f5733a4a48')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (14, N'2c8c5e9b-e9b3-418e-b2d2-a9ee292361e5', CAST(1000000.00 AS Decimal(18, 2)), N'Commercial in Bengaluru  Karnataka', N'commercial-in-bengaluru-karnataka-ae67f808-4bee-4ddc-b6c7-63af7b92184c', N'test@gmail.com', N'success', N'PayU', CAST(N'2025-04-08T06:46:46.753' AS DateTime), N'66a24987f7627e988e997880adf5bb292af5f488aed469db523be2ba231ed9cd90f0cfc54230466b2366f9e8ba6e08139263f3e7ce6407795ebbd7a3f3ef1e5d')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (15, N'4b1d5a78-c40a-4bdc-abe2-9d11d60a21bd', CAST(500000.00 AS Decimal(18, 2)), N'Residential in Pune  Maharashtra', N'residential-in-pune-maharashtra-310b4d35-b6dc-4c35-9864-5efde8cb5245', N'riya@gmail.com', N'success', N'PayU', CAST(N'2025-12-30T09:01:07.637' AS DateTime), N'10102f0fec81ad667988aa25a92779325569b09ff9898edf8bae69d23cda2c880ca03adba12691ea4a3f4bbf9d0b31fa5e66058fb01242fc7ce8bea63890ae1d')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (16, N'58e280df-3e84-4c4f-967b-7a22a719d40a', CAST(200000.00 AS Decimal(18, 2)), N'Corner Residential in surat  gujarat', N'corner-residential-in-surat-gujarat-97be762f-8531-4254-a6c9-b0f7f5b16327', N'undefined', N'success', N'PayU', CAST(N'2026-08-12T13:08:46.190' AS DateTime), N'a3d8740f3893e01198ba3f8fe6333842cb2e99dd4e5026f9dac85b1bcd9016d78977effd73394d764e2f1519b2c78a8a774a795cbf73829acf3a8c40bde18be2')
GO
INSERT [dbo].[Payments] ([Id], [TransactionId], [Amount], [PlanName], [FirstName], [Email], [Status], [PaymentGateway], [PaymentDate], [HashString]) VALUES (17, N'65aa8971-5390-4589-9c1b-da8c7116c94d', CAST(2000000.00 AS Decimal(18, 2)), N'Commercial in Mysuru  Karnataka', N'Commercial in Mysuru, Karnataka', N'heti@gmail.com', N'success', N'PayU', CAST(N'2026-09-23T17:03:52.167' AS DateTime), N'50e2aedbe26ebf45359b506380fe18da97da19490a560c1261ad02fdc6f39881996cf7379b94d9206f36b7c0e365efad5dfc511228bf2d4bda5bb4ce460ede87')
GO
SET IDENTITY_INSERT [dbo].[Payments] OFF
GO
SET IDENTITY_INSERT [dbo].[Permission] ON 
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (1, 1, NULL, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (2, 1, NULL, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (3, 1, NULL, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (4, 1, 1, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (5, 1, 1, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (7, 1, 2, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (13, 1, 1, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (15, 1, 4, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (17, 1, 6, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (18, 2, 6, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (20, 1, 8, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (21, 2, 8, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (22, 1, 3, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (25, 2, 10, NULL)
GO
INSERT [dbo].[Permission] ([id], [roleId], [menuId], [version]) VALUES (26, 1, 11, NULL)
GO
SET IDENTITY_INSERT [dbo].[Permission] OFF
GO
SET IDENTITY_INSERT [dbo].[Property] ON 
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1031, N'sell', 0, N'sold', 1, N'/properties/img_pro7_garden.jpg,/properties/img_pro8.jpg,/properties/img_pro8_fernicure.jpg,/properties/img_pro9.jpg', CAST(N'2025-04-06T15:07:26.980' AS DateTime), CAST(N'2025-04-06T15:07:26.980' AS DateTime), CAST(100000.00 AS Decimal(10, 2)), 56, 12, 1, 1, N'96325', N'Locality', N'', N'', N'description', N'AL Bazaar ,opp Parvat Patiya,surat ,gujarat', N'yesha@gmail.com', N'48975632176', N'Residential in surat, gujarat', 28, N'residential-in-surat-gujarat-a331b8c9-910b-4502-b19d-ac9a790f7d8d', 2, NULL, 0, 28, NULL, NULL)
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1032, N'sell', 0, N'sold', 1, N'/properties/img_pro2_fernicure.jpg,/properties/img_pro2_garden.jpg,/properties/img_pro3.jpg,/properties/img_pro3_fernicure.jpg', CAST(N'2025-04-06T15:38:53.257' AS DateTime), CAST(N'2025-04-06T15:38:53.257' AS DateTime), CAST(100000.00 AS Decimal(10, 2)), 12, 56, 1, 1, N'32145', N'localtity', N'', N'', N'description', N'YK Street near AK Complex', N'rohan3@gmail.com', N'7946134837', N'Commercial in surat, gujarat', 28, N'commercial-in-surat-gujarat-975a13ba-3112-4e71-bc9a-0120b77b6b72', 1, NULL, 0, NULL, NULL, N'kk Builder ')
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1033, N'sell', 0, N'sold', 1, N'', CAST(N'2025-04-06T18:01:02.010' AS DateTime), CAST(N'2025-04-06T18:01:02.010' AS DateTime), CAST(200000.00 AS Decimal(10, 2)), 16, 20, 1, 1, N'65412', N'Locality', N'', N'', N'description', N'YK Street near AK Complex', N'rohan3@gmail.com', N'7946134837', N'Commercial in surat, gujarat', 32, N'commercial-in-surat-gujarat-9ede1ec6-e8b0-42e6-9465-37153d4cb1c4', 1, NULL, 0, NULL, NULL, N'hy Builder ')
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1034, N'sell', 0, N'sold', 1, N'/properties/img_pro1_fernicure.jpg,/properties/img_pro1_garden.jpg,/properties/img_pro2.jpg,/properties/img_pro2_fernicure.jpg', CAST(N'2025-04-07T20:00:17.737' AS DateTime), CAST(N'2025-04-07T20:00:17.737' AS DateTime), CAST(1000000.00 AS Decimal(10, 2)), 120, 56, 12, 17, N'96325', N'raigad', N'', N'', N'lavish property with furnished and asethetic home views', N'B-1,YK Street near AK Complex', N'john@gmail.com', N'79461348378', N'Commercial in Bengaluru, Karnataka', 28, N'commercial-in-bengaluru-karnataka-ae67f808-4bee-4ddc-b6c7-63af7b92184c', 1, NULL, 0, 28, NULL, NULL)
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1035, N'sell', 0, N'sold', 1, N'/properties/img_pro6_fernicure.jpg,/properties/img_pro10_fernicure.jpg', CAST(N'2025-04-07T20:02:54.090' AS DateTime), CAST(N'2025-04-07T20:02:54.090' AS DateTime), CAST(500000.00 AS Decimal(10, 2)), 56, 12, 15, 3, N'45216', N'dabgadvad', N'', N'', N'4bhk bunglow with master bedroom,washroom,with garden area', N'AL Bazaar ,opp Parvat Patiya,pune ,maharatsra', N'john@gmail.com', N'48975632179', N'Residential in Pune, Maharashtra', 31, N'residential-in-pune-maharashtra-310b4d35-b6dc-4c35-9864-5efde8cb5245', 2, NULL, 0, 31, NULL, NULL)
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1036, N'sell', 0, N'sold', 1, N'/properties/img_pro7_garden.jpg,/properties/img_pro8.jpg,/properties/img_pro8_fernicure.jpg,/properties/img_pro9_fernicure.jpg,/properties/img_pro9_garden.jpg,/properties/img_pro1_garden.jpg,/properties/img_pro2.jpg,/properties/img_pro2_fernicure.jpg', CAST(N'2025-04-07T20:08:23.273' AS DateTime), CAST(N'2025-04-07T20:08:23.273' AS DateTime), CAST(500000.00 AS Decimal(10, 2)), 20, 12, 1, 1, N'78541', N'udhna darwaja', N'', N'', N'240sqft office area with basement parking facility and 24 hours water facility', N'B-1,YK Street near AK Complex', N'john@gmail.com', N'79461348378', N'Commercial in surat, gujarat', NULL, N'commercial-in-surat-gujarat-4da20c8c-32e7-4463-b0a4-6fe8efab7beb', 1, NULL, 0, NULL, NULL, NULL)
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1037, N'sell', 0, N'sold', 1, N'/properties/img_pro8.jpg,/properties/img_pro9.jpg', CAST(N'2025-04-07T20:12:17.190' AS DateTime), CAST(N'2025-04-07T20:12:17.190' AS DateTime), CAST(200000.00 AS Decimal(10, 2)), 90, 20, 1, 1, N'96325', N'althan', N'', N'', N'2bhk homes with all facilties', N'B-204 ,opp Sankas complex, althan,surat ,gujarat', N'yesha@gmail.com', N'04897563217', N'Corner Residential in surat, gujarat', 31, N'corner-residential-in-surat-gujarat-97be762f-8531-4254-a6c9-b0f7f5b16327', 2, NULL, 1, 31, NULL, NULL)
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1038, N'sell', 0, N'available', 1, N'/properties/img_pro5.jpg,/properties/img_pro5_fernicure.jpg', CAST(N'2025-04-07T20:14:10.467' AS DateTime), CAST(N'2025-04-07T20:14:10.467' AS DateTime), CAST(2000000.00 AS Decimal(10, 2)), 12, 14, 12, 18, N'78451', N'fadiya', N'', N'', N'commercial property for sale', N'B-17,YK Street near AK Complex', N'john@gmail.com', N'79461348378', N'Commercial in Mysuru, Karnataka', 33, N'commercial-in-mysuru-karnataka-5fc14c5e-ae4c-4761-a10a-0f7553f75d06', 1, NULL, 0, 33, NULL, NULL)
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1039, N'sell', 0, N'available', 1, N'/properties/img_pro1_fernicure.jpg,/properties/img_pro1_garden.jpg,/properties/img_pro2.jpg', CAST(N'2025-04-08T04:32:32.897' AS DateTime), CAST(N'2025-04-08T04:32:32.897' AS DateTime), CAST(5600000.00 AS Decimal(10, 2)), 65, 2, 1, 1, N'96325', N'pithawal', N'', N'', N'luxurious property with all facilities', N'YK Street near AK Complex', N'rohan3@gmail.com', N'79461348379', N'Commercial in surat, gujarat', NULL, N'commercial-in-surat-gujarat-f87ff844-9428-45f1-8967-08d6d8c35a57', 1, NULL, 0, NULL, NULL, NULL)
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1040, N'sell', 0, N'sold', 1, N'/properties/img_pro7_fernicure.jpg,/properties/img_pro7_garden.jpg', CAST(N'2025-04-08T04:45:36.367' AS DateTime), CAST(N'2025-04-08T04:45:36.367' AS DateTime), CAST(560000.00 AS Decimal(10, 2)), 12, 12, 1, 1, N'12345', N'Locality', N'', N'', N'lavish property', N'YK Street near AK Complex', N'rohan3@gmail.com', N'7946134837', N'Residential in surat, gujarat', 28, N'residential-in-surat-gujarat-972d2408-49fb-4510-b700-a02b0856dab1', 2, NULL, 0, NULL, NULL, N'priya ''s Agency')
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1041, N'sell', 0, N'available', 1, NULL, CAST(N'2025-04-08T06:42:26.550' AS DateTime), CAST(N'2025-04-08T06:42:26.550' AS DateTime), CAST(100000.00 AS Decimal(10, 2)), 12, 56, 1, 1, N'45621', N'locality', N'', N'', N'description', N'YK Street near AK Complex', N'rohan3@gmail.com', N'07946134837', N'Corner Commercial in surat, gujarat', 2, N'corner-commercial-in-surat-gujarat-dc40c5c1-1066-4167-b5b4-05c05b21d7bc', 2, NULL, 1, 2, NULL, NULL)
GO
INSERT [dbo].[Property] ([id], [propertyFor], [isSociety], [status], [isActive], [images], [updatedOn], [createdOn], [price], [length], [breadth], [stateId], [cityId], [pincode], [locality], [societyName], [flatNo], [description], [address], [email], [phoneNo], [title], [userId], [slug], [typeId], [imgPath], [cornerPlot], [builderId], [version], [agencyName]) VALUES (1042, N'sell', 0, N'available', 1, NULL, CAST(N'2025-04-08T06:50:11.557' AS DateTime), CAST(N'2025-04-08T06:50:11.557' AS DateTime), CAST(123000.00 AS Decimal(10, 2)), 12, 2, 1, 1, N'395011', N'local', N'', N'', N'description to builder', N'YK Street near AK Complex', N'rohan3@gmail.com', N'07946134837', N'Corner Commercial in surat, gujarat', 28, N'corner-commercial-in-surat-gujarat-3247abb9-1fc5-472e-afa7-c62ae788a6c2', 1, NULL, 1, 28, NULL, N'Test')
GO
SET IDENTITY_INSERT [dbo].[Property] OFF
GO
INSERT [dbo].[PropertyOriginal] ([id], [title], [type], [is_active]) VALUES (1, N'Commercial', N'commercial', 1)
GO
INSERT [dbo].[PropertyOriginal] ([id], [title], [type], [is_active]) VALUES (2, N'Residential', N'residential', 1)
GO
INSERT [dbo].[PropertyOriginal] ([id], [title], [type], [is_active]) VALUES (3, N'Industrial', N'industrial', 1)
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 
GO
INSERT [dbo].[Roles] ([id], [name], [version]) VALUES (1, N'admin', 1)
GO
INSERT [dbo].[Roles] ([id], [name], [version]) VALUES (2, N'builder', 0)
GO
INSERT [dbo].[Roles] ([id], [name], [version]) VALUES (6, N'Visiter', 0)
GO
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[state] ON 
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (1, N'gujarat', 1, CAST(N'2025-02-23T14:30:00.000' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (2, N'Andhra Pradesh', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (3, N'Arunachal Pradesh', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (4, N'Assam', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (5, N'Bihar', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (6, N'Chhattisgarh', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (7, N'Goa', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (8, N'Gujarat', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (9, N'Haryana', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (10, N'Himachal Pradesh', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (11, N'Jharkhand', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (12, N'Karnataka', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (13, N'Kerala', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (14, N'Madhya Pradesh', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (15, N'Maharashtra', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (16, N'Manipur', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (17, N'Meghalaya', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (18, N'Mizoram', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (19, N'Nagaland', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (20, N'Odisha', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (21, N'Punjab', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (22, N'Rajasthan', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (23, N'Sikkim', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (24, N'Tamil Nadu', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (25, N'Telangana', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (26, N'Tripura', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (27, N'Uttar Pradesh', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (28, N'Uttarakhand', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
INSERT [dbo].[state] ([id], [name], [is_active], [created_on]) VALUES (29, N'West Bengal', 1, CAST(N'2025-03-22T10:42:55.223' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[state] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 
GO
INSERT [dbo].[users] ([id], [userType], [isAdmin], [status], [updatedOn], [fname], [lname], [userName], [email], [phoneNo], [state_id], [city_id], [pincode], [role], [createdOn], [password], [PhotoPath]) VALUES (2, NULL, NULL, 1, NULL, N'rohan', N'Ale', N'Rohan3', N'rohan3@gmail.com', N'7946134837', 12, 17, 395010, N'admin', NULL, N'$2a$11$0fPn.avWL54D/Zp8MtExbO31UNSCnK61ebK9h3K2njTqt6PJ1NYRG', N'/uploads/users/49c5d8ad-8966-483d-a92e-36bc7044ac6c.png')
GO
INSERT [dbo].[users] ([id], [userType], [isAdmin], [status], [updatedOn], [fname], [lname], [userName], [email], [phoneNo], [state_id], [city_id], [pincode], [role], [createdOn], [password], [PhotoPath]) VALUES (27, NULL, NULL, 1, NULL, N'heti', N'patel', N'heti', N'heti@gmail.com', N'9426963257', 12, 17, 395010, N'user', NULL, N'$2a$11$PnfLn1i2JGcGdL7Injsk0.Lgn2r2PEVq2mcMjuGzoDQ0QKm9AbLL6', N'/uploads/users/91ccc45e-9a50-43a1-96f1-d473f58c78d4.png')
GO
INSERT [dbo].[users] ([id], [userType], [isAdmin], [status], [updatedOn], [fname], [lname], [userName], [email], [phoneNo], [state_id], [city_id], [pincode], [role], [createdOn], [password], [PhotoPath]) VALUES (28, NULL, NULL, 1, NULL, N'Priya', N'Dave', N'priya', N'priya@gmail.com', N'8123456896', 1, 1, 12300, N'builder', NULL, N'$2a$11$/rQ8aJiVrq7lCHkPI3HBQ.HVvki03088emKxpFJbwT18t87R1gPSS', NULL)
GO
INSERT [dbo].[users] ([id], [userType], [isAdmin], [status], [updatedOn], [fname], [lname], [userName], [email], [phoneNo], [state_id], [city_id], [pincode], [role], [createdOn], [password], [PhotoPath]) VALUES (29, NULL, NULL, NULL, NULL, N'mitu', N'patel', N'mitu', N'mitu@gmail.com', N'1234567891', 1, 1, 96325, N'admin', CAST(N'2025-04-04T19:26:46.167' AS DateTime), N'$2a$11$X18P6ECXrFt7yo5jZdrDs.3FQwbFWBHNKLe7BI8b7/rPwxm6RXdPm', NULL)
GO
INSERT [dbo].[users] ([id], [userType], [isAdmin], [status], [updatedOn], [fname], [lname], [userName], [email], [phoneNo], [state_id], [city_id], [pincode], [role], [createdOn], [password], [PhotoPath]) VALUES (30, NULL, NULL, NULL, NULL, N'riya', N'Patel', N'riya', N'riya@gmail.com', N'9632587451', 1, 1, 96325, N'admin', CAST(N'2025-04-05T19:12:14.240' AS DateTime), N'$2a$11$kho5MGOfsSrMYdPXCI9o3OABvBsnSNOUJAcpNrSsTI8RgkGeyofWy', NULL)
GO
INSERT [dbo].[users] ([id], [userType], [isAdmin], [status], [updatedOn], [fname], [lname], [userName], [email], [phoneNo], [state_id], [city_id], [pincode], [role], [createdOn], [password], [PhotoPath]) VALUES (31, NULL, NULL, 1, NULL, N'kitu', N'dave', N'kitu', N'kitu@gmail.com', N'8547123699', NULL, NULL, NULL, N'builder', NULL, N'$2a$11$BDj5/yo2qzXBHel3KVdkJeZSNiaY0/q/A401CHEyj8LimXbYHmpoG', N'/uploads/users/6022aafb-d056-45c7-9b87-06e531b10ff7.jpg')
GO
INSERT [dbo].[users] ([id], [userType], [isAdmin], [status], [updatedOn], [fname], [lname], [userName], [email], [phoneNo], [state_id], [city_id], [pincode], [role], [createdOn], [password], [PhotoPath]) VALUES (32, NULL, NULL, 1, NULL, N'krish', N'patel', N'krish', N'krish@gmail.com', N'6541239874', NULL, NULL, NULL, N'builder', NULL, N'$2a$11$741wZkgKRflcYqvw5I.PyO6WyiLTwaYDbZ/OeT2yW9JD4NaJAFD1W', N'/uploads/users/ba32058b-dcb4-4ee4-a401-1f54ba8ea0ce.png')
GO
INSERT [dbo].[users] ([id], [userType], [isAdmin], [status], [updatedOn], [fname], [lname], [userName], [email], [phoneNo], [state_id], [city_id], [pincode], [role], [createdOn], [password], [PhotoPath]) VALUES (33, NULL, NULL, 1, NULL, N'mohan', N'shah', N'mohan', N'mohan@gmail.com', N'9741236549', NULL, NULL, NULL, N'builder', NULL, N'$2a$11$a24IlUjF87ijtR22Zdn8NeSI/99ccsOyUKU9U5ixSwubC2j31kpnK', N'/uploads/users/39424346-a936-4380-a210-c8bdd0bc78c3.jpg')
GO
INSERT [dbo].[users] ([id], [userType], [isAdmin], [status], [updatedOn], [fname], [lname], [userName], [email], [phoneNo], [state_id], [city_id], [pincode], [role], [createdOn], [password], [PhotoPath]) VALUES (34, NULL, NULL, 1, NULL, N'geeta', N'rana', N'geeta', N'geeta@gmail.com', N'9874563214', NULL, NULL, NULL, N'builder', NULL, N'$2a$11$gwFHjzteLKOHiviAnkydHeJziK6yl85HJkGxKLPOqKoeomWZam.b.', N'/uploads/users/4a09a005-41dd-4a08-8532-76f0b74b48c4.png')
GO
INSERT [dbo].[users] ([id], [userType], [isAdmin], [status], [updatedOn], [fname], [lname], [userName], [email], [phoneNo], [state_id], [city_id], [pincode], [role], [createdOn], [password], [PhotoPath]) VALUES (35, NULL, NULL, 1, NULL, N'john', N'doe', N'john', N'john@gmail.com', N'7412365478', NULL, NULL, NULL, N'admin', NULL, N'$2a$11$xUdLIfbMZUU5t/1r3Sx5QuGnijnxJioLJCA.jjuyhq25KMl1bGZ0S', N'/uploads/users/c1c1de46-5e7c-4671-96cf-1e3ac20e3501.jpg')
GO
INSERT [dbo].[users] ([id], [userType], [isAdmin], [status], [updatedOn], [fname], [lname], [userName], [email], [phoneNo], [state_id], [city_id], [pincode], [role], [createdOn], [password], [PhotoPath]) VALUES (36, NULL, NULL, 1, NULL, N'test', N'test', N'test', N'test@gmail.com', N'8794653125', 1, 1, 54621, N'user', NULL, N'$2a$11$NU5N6HyvdnwVEpt6HtrJ1OnYt0gcrgdchpCyS8hMRMrnzHZPTPP4y', N'/uploads/users/d32bc7bf-d9c7-45c6-a16f-93168cf7058f.jpg')
GO
SET IDENTITY_INSERT [dbo].[users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Builder__AB6E61643CE008FE]    Script Date: 05-10-2026 21:37:52 ******/
ALTER TABLE [dbo].[Builder] ADD  CONSTRAINT [UQ__Builder__AB6E61643CE008FE] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Payments] ADD  DEFAULT ('PayU') FOR [PaymentGateway]
GO
ALTER TABLE [dbo].[Payments] ADD  DEFAULT (getutcdate()) FOR [PaymentDate]
GO
ALTER TABLE [dbo].[Roles] ADD  CONSTRAINT [DF__Roles__version__412EB0B6]  DEFAULT ((0)) FOR [version]
GO
ALTER TABLE [dbo].[state] ADD  CONSTRAINT [DF__state__is_active__4BAC3F29]  DEFAULT (NULL) FOR [is_active]
GO
ALTER TABLE [dbo].[state] ADD  CONSTRAINT [DF__state__created_o__4CA06362]  DEFAULT (NULL) FOR [created_on]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__userType__4F7CD00D]  DEFAULT (NULL) FOR [userType]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__isAdmin__5070F446]  DEFAULT (NULL) FOR [isAdmin]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__status__5165187F]  DEFAULT (NULL) FOR [status]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__updatedOn__52593CB8]  DEFAULT (NULL) FOR [updatedOn]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__phoneNo__534D60F1]  DEFAULT (NULL) FOR [phoneNo]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__state_id__5441852A]  DEFAULT (NULL) FOR [state_id]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__city_id__5535A963]  DEFAULT (NULL) FOR [city_id]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__pincode__5629CD9C]  DEFAULT (NULL) FOR [pincode]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__role__571DF1D5]  DEFAULT (NULL) FOR [role]
GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [DF__users__createdOn__5812160E]  DEFAULT (NULL) FOR [createdOn]
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD  CONSTRAINT [FK_Appointment_builder] FOREIGN KEY([BuilderId])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[Appointment] CHECK CONSTRAINT [FK_Appointment_builder]
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD  CONSTRAINT [FK_Appointment_builder_availability] FOREIGN KEY([AvailabilityId])
REFERENCES [dbo].[builder_availability] ([id])
GO
ALTER TABLE [dbo].[Appointment] CHECK CONSTRAINT [FK_Appointment_builder_availability]
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD  CONSTRAINT [FK_Appointment_Property] FOREIGN KEY([PropertyId])
REFERENCES [dbo].[Property] ([id])
GO
ALTER TABLE [dbo].[Appointment] CHECK CONSTRAINT [FK_Appointment_Property]
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD  CONSTRAINT [FK_Appointment_users] FOREIGN KEY([UserId])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[Appointment] CHECK CONSTRAINT [FK_Appointment_users]
GO
ALTER TABLE [dbo].[builder_availability]  WITH CHECK ADD  CONSTRAINT [FK_builder_availability_users] FOREIGN KEY([BuilderId])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[builder_availability] CHECK CONSTRAINT [FK_builder_availability_users]
GO
ALTER TABLE [dbo].[City]  WITH CHECK ADD  CONSTRAINT [FK_City_state] FOREIGN KEY([state_id])
REFERENCES [dbo].[state] ([id])
GO
ALTER TABLE [dbo].[City] CHECK CONSTRAINT [FK_City_state]
GO
ALTER TABLE [dbo].[Permission]  WITH CHECK ADD  CONSTRAINT [FK__Permissio__menuI__44FF419A] FOREIGN KEY([menuId])
REFERENCES [dbo].[Menu] ([id])
GO
ALTER TABLE [dbo].[Permission] CHECK CONSTRAINT [FK__Permissio__menuI__44FF419A]
GO
ALTER TABLE [dbo].[Permission]  WITH CHECK ADD  CONSTRAINT [FK__Permissio__roleI__440B1D61] FOREIGN KEY([roleId])
REFERENCES [dbo].[Roles] ([id])
GO
ALTER TABLE [dbo].[Permission] CHECK CONSTRAINT [FK__Permissio__roleI__440B1D61]
GO
ALTER TABLE [dbo].[Property]  WITH CHECK ADD  CONSTRAINT [FK_Property_City] FOREIGN KEY([cityId])
REFERENCES [dbo].[City] ([id])
GO
ALTER TABLE [dbo].[Property] CHECK CONSTRAINT [FK_Property_City]
GO
ALTER TABLE [dbo].[Property]  WITH CHECK ADD  CONSTRAINT [FK_Property_PropertyOriginal] FOREIGN KEY([typeId])
REFERENCES [dbo].[PropertyOriginal] ([id])
GO
ALTER TABLE [dbo].[Property] CHECK CONSTRAINT [FK_Property_PropertyOriginal]
GO
ALTER TABLE [dbo].[Property]  WITH CHECK ADD  CONSTRAINT [FK_Property_state] FOREIGN KEY([stateId])
REFERENCES [dbo].[state] ([id])
GO
ALTER TABLE [dbo].[Property] CHECK CONSTRAINT [FK_Property_state]
GO
ALTER TABLE [dbo].[Property]  WITH CHECK ADD  CONSTRAINT [FK_Property_users] FOREIGN KEY([userId])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[Property] CHECK CONSTRAINT [FK_Property_users]
GO
ALTER TABLE [dbo].[Property]  WITH CHECK ADD  CONSTRAINT [FK_Property_users1] FOREIGN KEY([builderId])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[Property] CHECK CONSTRAINT [FK_Property_users1]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK_users_City] FOREIGN KEY([city_id])
REFERENCES [dbo].[City] ([id])
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK_users_City]
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK_users_state] FOREIGN KEY([state_id])
REFERENCES [dbo].[state] ([id])
GO
ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK_users_state]
GO
