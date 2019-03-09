USE [Prueba_Cartilla]
GO
/****** Object:  Table [dbo].[CART_BARRIOS]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_BARRIOS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_localidad] [int] NOT NULL,
	[descripcion] [nvarchar](60) NOT NULL,
	[codigo_postal] [int] NULL,
 CONSTRAINT [PK_CART_BARRIOS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_CATEGORIAS]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_CATEGORIAS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](60) NOT NULL,
 CONSTRAINT [PK_CART_CATEGORIAS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_CLINICAS]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_CLINICAS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_especialidad_clinica] [int] NOT NULL,
	[id_entidad] [int] NOT NULL,
	[razon_social] [nvarchar](60) NOT NULL,
	[nombre] [nvarchar](60) NULL,
	[cuit] [nvarchar](11) NOT NULL,
	[estado_prestador] [bit] NOT NULL,
	[time_create] [datetime] NULL,
	[time_modify] [datetime] NULL,
	[estado_ioma] [bit] NOT NULL,
	[id_entidad_hijo] [int] NULL,
	[tiene_guardia] [bit] NULL,
 CONSTRAINT [PK_CART_INSTITUCION_SANITARIA] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_especialidad_clinica_alta_complejidad] [int] NOT NULL,
	[id_entidad] [int] NOT NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[razon_social] [nvarchar](100) NOT NULL,
	[cuit] [nvarchar](11) NOT NULL,
	[estado_prestador] [bit] NOT NULL,
	[time_create] [datetime] NULL,
	[time_modify] [datetime] NULL,
	[estado_ioma] [bit] NOT NULL,
	[id_entidad_hijo] [int] NULL,
	[tiene_guardia] [bit] NULL,
 CONSTRAINT [PK_CART_ESTABLESIMIENTO] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_DOMICILIOS]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_DOMICILIOS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_entidad] [int] NULL,
	[id_partido] [int] NOT NULL,
	[id_localidad] [int] NOT NULL,
	[id_barrio] [int] NULL,
	[codigo_postal] [int] NULL,
	[calle] [nvarchar](80) NOT NULL,
	[altura] [nvarchar](20) NOT NULL,
	[piso] [nvarchar](20) NULL,
	[departamento] [nvarchar](10) NULL,
	[latitud] [numeric](9, 6) NULL,
	[longitud] [numeric](9, 6) NULL,
	[time_create] [datetime] NULL,
	[time_modify] [datetime] NULL,
	[id_profesional] [int] NULL,
	[id_farmacia] [int] NULL,
	[id_clinica_alta_complejidad] [int] NULL,
	[id_clinica] [int] NULL,
 CONSTRAINT [PK_CART_DOMICILIOS_PROFESIONALES] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_ENTIDADES]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_ENTIDADES](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](150) NOT NULL,
	[estado] [bit] NOT NULL,
	[codigo] [int] NULL,
	[date] [datetime] NULL,
	[categoria] [nvarchar](150) NULL,
 CONSTRAINT [PK_CART_ENTIDAD] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_ENTIDADES_PROFESIONES]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_ENTIDADES_PROFESIONES](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_entidad] [int] NOT NULL,
	[id_profesion] [int] NOT NULL,
 CONSTRAINT [PK_CART_ENTIDADES_PROFESIONES] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_ESPECIALIDADES]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_ESPECIALIDADES](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_profesion] [int] NOT NULL,
	[descripcion] [nvarchar](150) NOT NULL,
 CONSTRAINT [PK_CART_ESPECIALIDADES] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_ESPECIALIDADES_CLINICAS]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_ESPECIALIDADES_CLINICAS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](150) NOT NULL,
	[codigo] [nvarchar](50) NULL,
 CONSTRAINT [PK_CART_ESPECIALIDAD_CLINICA] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_ESPECIALIDADES_CLINICAS_ALTA_COMPLEJIDAD]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_ESPECIALIDADES_CLINICAS_ALTA_COMPLEJIDAD](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](150) NOT NULL,
	[codigo] [nvarchar](50) NULL,
 CONSTRAINT [PK_CART_ESPECIALIDAD_CLINICA_ALTA_COMPLEJIDAD] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_ESTADOS]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_ESTADOS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](60) NOT NULL,
 CONSTRAINT [PK_CART_ESTADOS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_FARMACIAS]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_FARMACIAS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](60) NOT NULL,
	[razon_social] [nvarchar](60) NULL,
	[cuit] [nvarchar](11) NOT NULL,
	[estado_prestador] [bit] NOT NULL,
	[time_create] [datetime] NULL,
	[time_modify] [datetime] NULL,
	[estado_ioma] [bit] NOT NULL,
	[id_entidad] [int] NULL,
	[id_entidad_hijo] [int] NULL,
 CONSTRAINT [PK_CART_FARMACIAS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_HORARIOS_ATENCION]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_HORARIOS_ATENCION](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_domicilio] [int] NOT NULL,
	[dia] [nvarchar](20) NOT NULL,
	[desde_1] [nvarchar](5) NOT NULL,
	[hasta_1] [nvarchar](5) NOT NULL,
	[desde_2] [nvarchar](5) NULL,
	[hasta_2] [nvarchar](5) NULL,
	[time_create] [datetime] NULL,
	[time_modify] [datetime] NULL,
 CONSTRAINT [PK_CART_HORARIOS_ATENCION] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_LOCALIDADES]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_LOCALIDADES](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_partido] [int] NOT NULL,
	[descripcion] [nvarchar](60) NOT NULL,
	[codigo_postal] [int] NOT NULL,
 CONSTRAINT [PK_CART_LOCALIDADES] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_LOGS]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_LOGS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_usuario] [int] NOT NULL,
	[ip] [nvarchar](20) NOT NULL,
	[date] [datetime] NULL,
	[id_object] [int] NOT NULL,
	[method] [nvarchar](50) NULL,
	[level] [nvarchar](50) NULL,
	[url] [text] NULL,
	[params] [text] NULL,
	[body] [text] NULL,
	[message] [text] NULL,
 CONSTRAINT [PK_CART_LOGSS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_PARTIDOS]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_PARTIDOS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_CART_PARTIDOS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_PROFESIONALES]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_PROFESIONALES](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_profesion] [int] NOT NULL,
	[id_estado] [int] NULL,
	[id_categoria] [int] NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[apellido] [nvarchar](130) NULL,
	[cuit] [nvarchar](11) NOT NULL,
	[matricula_provincial] [int] NOT NULL,
	[matricula_nacional] [int] NULL,
	[estado_ioma] [bit] NULL,
	[time_create] [datetime] NULL,
	[time_modify] [datetime] NULL,
	[id_especialidad] [int] NULL,
	[id_entidad] [int] NULL,
	[id_entidad_hijo] [int] NULL,
 CONSTRAINT [PK_CART_PROFESIONALES] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_PRO_IX_MP_IX_ESPECIALIDAD] UNIQUE NONCLUSTERED 
(
	[id_profesion] ASC,
	[matricula_provincial] ASC,
	[id_especialidad] ASC,
	[id_entidad] ASC,
	[cuit] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_PROFESIONES]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_PROFESIONES](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](150) NOT NULL,
 CONSTRAINT [PK_CART_PROFESIONAL] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_TELEFONOS]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_TELEFONOS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_domicilio] [int] NOT NULL,
	[codigo_area] [int] NOT NULL,
	[numero] [int] NOT NULL,
	[interno] [int] NULL,
	[time_create] [datetime] NULL,
	[time_modify] [datetime] NULL,
 CONSTRAINT [PK_CART_TELEFONOS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_TOKENS]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_TOKENS](
	[id] [int] NOT NULL,
	[id_usuario] [int] NOT NULL,
	[token] [nvarchar](max) NOT NULL,
	[time_create] [datetime] NULL,
	[status] [bit] NULL,
 CONSTRAINT [PK_CART_TOKES] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CART_USUARIOS_ENTIDADES]    Script Date: 8/3/2019 1:11:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CART_USUARIOS_ENTIDADES](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_user] [int] NOT NULL,
	[id_entidad] [int] NOT NULL,
 CONSTRAINT [PK_CART_USUARIOS_ENTIDADES] PRIMARY KEY CLUSTERED 
(
	[id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[CART_CLINICAS] ADD  CONSTRAINT [DF_CART_INSTITUCION_SANITARIA_estado]  DEFAULT ((1)) FOR [estado_prestador]
GO
ALTER TABLE [dbo].[CART_CLINICAS] ADD  CONSTRAINT [DF_CART_INSTITUCIONES_SANITARIAS_time_create]  DEFAULT (getdate()) FOR [time_create]
GO
ALTER TABLE [dbo].[CART_CLINICAS] ADD  CONSTRAINT [DF_CART_INSTITUCIONES_SANITARIAS_estado_ioma]  DEFAULT ((1)) FOR [estado_ioma]
GO
ALTER TABLE [dbo].[CART_CLINICAS] ADD  CONSTRAINT [DF_CART_CLINICAS_guardia]  DEFAULT ((0)) FOR [tiene_guardia]
GO
ALTER TABLE [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD] ADD  CONSTRAINT [DF_CART_ESTABLESIMIENTO_estado]  DEFAULT ((1)) FOR [estado_prestador]
GO
ALTER TABLE [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD] ADD  CONSTRAINT [DF_CART_ESTABLECIMIENTOS_time_create]  DEFAULT (getdate()) FOR [time_create]
GO
ALTER TABLE [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD] ADD  CONSTRAINT [DF_CART_ESTABLECIMIENTOS_estado_ioma]  DEFAULT ((1)) FOR [estado_ioma]
GO
ALTER TABLE [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD] ADD  CONSTRAINT [DF_CART_CLINICAS_ALTA_COMPLEJIDAD_guardia]  DEFAULT ((0)) FOR [tiene_guardia]
GO
ALTER TABLE [dbo].[CART_DOMICILIOS] ADD  CONSTRAINT [DF_CART_DOMICILIOS_PROFESIONALES_time_create]  DEFAULT (getdate()) FOR [time_create]
GO
ALTER TABLE [dbo].[CART_DOMICILIOS] ADD  CONSTRAINT [DF_CART_DOMICILIOS_PROFESIONALES_time_modify]  DEFAULT (getdate()) FOR [time_modify]
GO
ALTER TABLE [dbo].[CART_ENTIDADES] ADD  CONSTRAINT [DF_CART_ENTIDAD_estado]  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[CART_ENTIDADES] ADD  CONSTRAINT [DF_CART_ENTIDADES_date]  DEFAULT (getdate()) FOR [date]
GO
ALTER TABLE [dbo].[CART_FARMACIAS] ADD  CONSTRAINT [DF_CART_FARMACIAS_estado]  DEFAULT ((1)) FOR [estado_prestador]
GO
ALTER TABLE [dbo].[CART_FARMACIAS] ADD  CONSTRAINT [DF_CART_FARMACIAS_time_create]  DEFAULT (getdate()) FOR [time_create]
GO
ALTER TABLE [dbo].[CART_FARMACIAS] ADD  CONSTRAINT [DF_CART_FARMACIAS_estado_ioma]  DEFAULT ((1)) FOR [estado_ioma]
GO
ALTER TABLE [dbo].[CART_HORARIOS_ATENCION] ADD  CONSTRAINT [DF_CART_HORARIOS_ATENCION_time_create]  DEFAULT (getdate()) FOR [time_create]
GO
ALTER TABLE [dbo].[CART_HORARIOS_ATENCION] ADD  CONSTRAINT [DF_CART_HORARIOS_ATENCION_time_modify]  DEFAULT (getdate()) FOR [time_modify]
GO
ALTER TABLE [dbo].[CART_LOGS] ADD  CONSTRAINT [DF_CART_LOGS_date]  DEFAULT (getdate()) FOR [date]
GO
ALTER TABLE [dbo].[CART_PROFESIONALES] ADD  CONSTRAINT [DF_CART_PROFESIONALES_id_estado]  DEFAULT ((1)) FOR [id_estado]
GO
ALTER TABLE [dbo].[CART_PROFESIONALES] ADD  CONSTRAINT [DF_CART_PROFESIONALES_estado_ioma]  DEFAULT ((1)) FOR [estado_ioma]
GO
ALTER TABLE [dbo].[CART_PROFESIONALES] ADD  CONSTRAINT [DF_CART_PROFESIONALES_time_create]  DEFAULT (getdate()) FOR [time_create]
GO
ALTER TABLE [dbo].[CART_PROFESIONALES] ADD  CONSTRAINT [DF_CART_PROFESIONALES_time_modify]  DEFAULT (getdate()) FOR [time_modify]
GO
ALTER TABLE [dbo].[CART_TELEFONOS] ADD  CONSTRAINT [DF_CART_TELEFONOS_time_create]  DEFAULT (getdate()) FOR [time_create]
GO
ALTER TABLE [dbo].[CART_TELEFONOS] ADD  CONSTRAINT [DF_CART_TELEFONOS_time_modify]  DEFAULT (getdate()) FOR [time_modify]
GO
ALTER TABLE [dbo].[CART_TOKENS] ADD  CONSTRAINT [DF_CART_TOKES_time_create]  DEFAULT (getdate()) FOR [time_create]
GO
ALTER TABLE [dbo].[CART_TOKENS] ADD  CONSTRAINT [DF_Table_1_valid]  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[CART_BARRIOS]  WITH CHECK ADD  CONSTRAINT [FK_CART_BARRIOS_CART_LOCALIDADES] FOREIGN KEY([id_localidad])
REFERENCES [dbo].[CART_LOCALIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_BARRIOS] CHECK CONSTRAINT [FK_CART_BARRIOS_CART_LOCALIDADES]
GO
ALTER TABLE [dbo].[CART_CLINICAS]  WITH CHECK ADD  CONSTRAINT [FK_CART_CLINICAS_CART_ENTIDADES] FOREIGN KEY([id_entidad])
REFERENCES [dbo].[CART_ENTIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_CLINICAS] CHECK CONSTRAINT [FK_CART_CLINICAS_CART_ENTIDADES]
GO
ALTER TABLE [dbo].[CART_CLINICAS]  WITH CHECK ADD  CONSTRAINT [FK_CART_CLINICAS_CART_ENTIDADES_HIJOS] FOREIGN KEY([id_entidad_hijo])
REFERENCES [dbo].[CART_ENTIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_CLINICAS] CHECK CONSTRAINT [FK_CART_CLINICAS_CART_ENTIDADES_HIJOS]
GO
ALTER TABLE [dbo].[CART_CLINICAS]  WITH CHECK ADD  CONSTRAINT [FK_CART_CLINICAS_CART_ESPECIALIDAD_CLINICA] FOREIGN KEY([id_especialidad_clinica])
REFERENCES [dbo].[CART_ESPECIALIDADES_CLINICAS] ([id])
GO
ALTER TABLE [dbo].[CART_CLINICAS] CHECK CONSTRAINT [FK_CART_CLINICAS_CART_ESPECIALIDAD_CLINICA]
GO
ALTER TABLE [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD]  WITH CHECK ADD  CONSTRAINT [FK_CART_CLINICAS_ALTA_COMPLEJIDAD_CART_ENTIDAD] FOREIGN KEY([id_entidad])
REFERENCES [dbo].[CART_ENTIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD] CHECK CONSTRAINT [FK_CART_CLINICAS_ALTA_COMPLEJIDAD_CART_ENTIDAD]
GO
ALTER TABLE [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD]  WITH CHECK ADD  CONSTRAINT [FK_CART_CLINICAS_ALTA_COMPLEJIDAD_CART_ENTIDADES_HIJOS] FOREIGN KEY([id_entidad_hijo])
REFERENCES [dbo].[CART_ENTIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD] CHECK CONSTRAINT [FK_CART_CLINICAS_ALTA_COMPLEJIDAD_CART_ENTIDADES_HIJOS]
GO
ALTER TABLE [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD]  WITH CHECK ADD  CONSTRAINT [FK_CART_CLINICAS_ALTA_COMPLEJIDAD_CART_ESPECIALIDAD_CLINICA_ALTA_COMPLEJIDAD] FOREIGN KEY([id_especialidad_clinica_alta_complejidad])
REFERENCES [dbo].[CART_ESPECIALIDADES_CLINICAS_ALTA_COMPLEJIDAD] ([id])
GO
ALTER TABLE [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD] CHECK CONSTRAINT [FK_CART_CLINICAS_ALTA_COMPLEJIDAD_CART_ESPECIALIDAD_CLINICA_ALTA_COMPLEJIDAD]
GO
ALTER TABLE [dbo].[CART_DOMICILIOS]  WITH CHECK ADD  CONSTRAINT [FK_CART_DOMICILIOS_CART_BARRIOS] FOREIGN KEY([id_barrio])
REFERENCES [dbo].[CART_BARRIOS] ([id])
GO
ALTER TABLE [dbo].[CART_DOMICILIOS] CHECK CONSTRAINT [FK_CART_DOMICILIOS_CART_BARRIOS]
GO
ALTER TABLE [dbo].[CART_DOMICILIOS]  WITH CHECK ADD  CONSTRAINT [FK_CART_DOMICILIOS_CART_CLINICAS] FOREIGN KEY([id_clinica])
REFERENCES [dbo].[CART_CLINICAS] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CART_DOMICILIOS] CHECK CONSTRAINT [FK_CART_DOMICILIOS_CART_CLINICAS]
GO
ALTER TABLE [dbo].[CART_DOMICILIOS]  WITH CHECK ADD  CONSTRAINT [FK_CART_DOMICILIOS_CART_CLINICAS_ALTA_COMPLEJIDAD] FOREIGN KEY([id_clinica_alta_complejidad])
REFERENCES [dbo].[CART_CLINICAS_ALTA_COMPLEJIDAD] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CART_DOMICILIOS] CHECK CONSTRAINT [FK_CART_DOMICILIOS_CART_CLINICAS_ALTA_COMPLEJIDAD]
GO
ALTER TABLE [dbo].[CART_DOMICILIOS]  WITH CHECK ADD  CONSTRAINT [FK_CART_DOMICILIOS_CART_ENTIDAD] FOREIGN KEY([id_entidad])
REFERENCES [dbo].[CART_ENTIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_DOMICILIOS] CHECK CONSTRAINT [FK_CART_DOMICILIOS_CART_ENTIDAD]
GO
ALTER TABLE [dbo].[CART_DOMICILIOS]  WITH CHECK ADD  CONSTRAINT [FK_CART_DOMICILIOS_CART_FARMACIAS] FOREIGN KEY([id_farmacia])
REFERENCES [dbo].[CART_FARMACIAS] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CART_DOMICILIOS] CHECK CONSTRAINT [FK_CART_DOMICILIOS_CART_FARMACIAS]
GO
ALTER TABLE [dbo].[CART_DOMICILIOS]  WITH CHECK ADD  CONSTRAINT [FK_CART_DOMICILIOS_CART_LOCALIDADES] FOREIGN KEY([id_localidad])
REFERENCES [dbo].[CART_LOCALIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_DOMICILIOS] CHECK CONSTRAINT [FK_CART_DOMICILIOS_CART_LOCALIDADES]
GO
ALTER TABLE [dbo].[CART_DOMICILIOS]  WITH CHECK ADD  CONSTRAINT [FK_CART_DOMICILIOS_CART_PARTIDOS] FOREIGN KEY([id_partido])
REFERENCES [dbo].[CART_PARTIDOS] ([id])
GO
ALTER TABLE [dbo].[CART_DOMICILIOS] CHECK CONSTRAINT [FK_CART_DOMICILIOS_CART_PARTIDOS]
GO
ALTER TABLE [dbo].[CART_DOMICILIOS]  WITH CHECK ADD  CONSTRAINT [FK_CART_DOMICILIOS_CART_PROFESIONALES] FOREIGN KEY([id_profesional])
REFERENCES [dbo].[CART_PROFESIONALES] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CART_DOMICILIOS] CHECK CONSTRAINT [FK_CART_DOMICILIOS_CART_PROFESIONALES]
GO
ALTER TABLE [dbo].[CART_ENTIDADES_PROFESIONES]  WITH CHECK ADD  CONSTRAINT [FK_CART_ENTIDADES_PROFESIONES_CART_ENTIDADES] FOREIGN KEY([id_entidad])
REFERENCES [dbo].[CART_ENTIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_ENTIDADES_PROFESIONES] CHECK CONSTRAINT [FK_CART_ENTIDADES_PROFESIONES_CART_ENTIDADES]
GO
ALTER TABLE [dbo].[CART_ENTIDADES_PROFESIONES]  WITH CHECK ADD  CONSTRAINT [FK_CART_ENTIDADES_PROFESIONES_CART_PROFESIONES] FOREIGN KEY([id_profesion])
REFERENCES [dbo].[CART_PROFESIONES] ([id])
GO
ALTER TABLE [dbo].[CART_ENTIDADES_PROFESIONES] CHECK CONSTRAINT [FK_CART_ENTIDADES_PROFESIONES_CART_PROFESIONES]
GO
ALTER TABLE [dbo].[CART_ESPECIALIDADES]  WITH CHECK ADD  CONSTRAINT [FK_CART_ESPECIALIDADES_CART_PROFESION] FOREIGN KEY([id_profesion])
REFERENCES [dbo].[CART_PROFESIONES] ([id])
GO
ALTER TABLE [dbo].[CART_ESPECIALIDADES] CHECK CONSTRAINT [FK_CART_ESPECIALIDADES_CART_PROFESION]
GO
ALTER TABLE [dbo].[CART_FARMACIAS]  WITH CHECK ADD  CONSTRAINT [FK_CART_FARMACIAS_CART_ENTIDADES] FOREIGN KEY([id_entidad])
REFERENCES [dbo].[CART_ENTIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_FARMACIAS] CHECK CONSTRAINT [FK_CART_FARMACIAS_CART_ENTIDADES]
GO
ALTER TABLE [dbo].[CART_FARMACIAS]  WITH CHECK ADD  CONSTRAINT [FK_CART_FARMACIAS_CART_ENTIDADES_HIJOS] FOREIGN KEY([id_entidad_hijo])
REFERENCES [dbo].[CART_ENTIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_FARMACIAS] CHECK CONSTRAINT [FK_CART_FARMACIAS_CART_ENTIDADES_HIJOS]
GO
ALTER TABLE [dbo].[CART_HORARIOS_ATENCION]  WITH CHECK ADD  CONSTRAINT [FK_CART_HORARIOS_ATENCION_CART_DOMICILIOS] FOREIGN KEY([id_domicilio])
REFERENCES [dbo].[CART_DOMICILIOS] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CART_HORARIOS_ATENCION] CHECK CONSTRAINT [FK_CART_HORARIOS_ATENCION_CART_DOMICILIOS]
GO
ALTER TABLE [dbo].[CART_LOCALIDADES]  WITH CHECK ADD  CONSTRAINT [FK_CART_LOCALIDADES_CART_PARTIDOS] FOREIGN KEY([id_partido])
REFERENCES [dbo].[CART_PARTIDOS] ([id])
GO
ALTER TABLE [dbo].[CART_LOCALIDADES] CHECK CONSTRAINT [FK_CART_LOCALIDADES_CART_PARTIDOS]
GO
ALTER TABLE [dbo].[CART_PROFESIONALES]  WITH CHECK ADD  CONSTRAINT [FK_CART_PROFESIONALES_CART_CATEGORIAS] FOREIGN KEY([id_categoria])
REFERENCES [dbo].[CART_CATEGORIAS] ([id])
GO
ALTER TABLE [dbo].[CART_PROFESIONALES] CHECK CONSTRAINT [FK_CART_PROFESIONALES_CART_CATEGORIAS]
GO
ALTER TABLE [dbo].[CART_PROFESIONALES]  WITH CHECK ADD  CONSTRAINT [FK_CART_PROFESIONALES_CART_ENTIDADES] FOREIGN KEY([id_entidad])
REFERENCES [dbo].[CART_ENTIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_PROFESIONALES] CHECK CONSTRAINT [FK_CART_PROFESIONALES_CART_ENTIDADES]
GO
ALTER TABLE [dbo].[CART_PROFESIONALES]  WITH CHECK ADD  CONSTRAINT [FK_CART_PROFESIONALES_CART_ENTIDADES_HIJOS] FOREIGN KEY([id_entidad_hijo])
REFERENCES [dbo].[CART_ENTIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_PROFESIONALES] CHECK CONSTRAINT [FK_CART_PROFESIONALES_CART_ENTIDADES_HIJOS]
GO
ALTER TABLE [dbo].[CART_PROFESIONALES]  WITH CHECK ADD  CONSTRAINT [FK_CART_PROFESIONALES_CART_ESPECIALIADADES] FOREIGN KEY([id_especialidad])
REFERENCES [dbo].[CART_ESPECIALIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_PROFESIONALES] CHECK CONSTRAINT [FK_CART_PROFESIONALES_CART_ESPECIALIADADES]
GO
ALTER TABLE [dbo].[CART_PROFESIONALES]  WITH CHECK ADD  CONSTRAINT [FK_CART_PROFESIONALES_CART_ESTADOS] FOREIGN KEY([id_estado])
REFERENCES [dbo].[CART_ESTADOS] ([id])
GO
ALTER TABLE [dbo].[CART_PROFESIONALES] CHECK CONSTRAINT [FK_CART_PROFESIONALES_CART_ESTADOS]
GO
ALTER TABLE [dbo].[CART_PROFESIONALES]  WITH CHECK ADD  CONSTRAINT [FK_CART_PROFESIONALES_CART_PROFESION] FOREIGN KEY([id_profesion])
REFERENCES [dbo].[CART_PROFESIONES] ([id])
GO
ALTER TABLE [dbo].[CART_PROFESIONALES] CHECK CONSTRAINT [FK_CART_PROFESIONALES_CART_PROFESION]
GO
ALTER TABLE [dbo].[CART_TELEFONOS]  WITH CHECK ADD  CONSTRAINT [FK_CART_TELEFONOS_CART_DOMICILIOS] FOREIGN KEY([id_domicilio])
REFERENCES [dbo].[CART_DOMICILIOS] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CART_TELEFONOS] CHECK CONSTRAINT [FK_CART_TELEFONOS_CART_DOMICILIOS]
GO
ALTER TABLE [dbo].[CART_USUARIOS_ENTIDADES]  WITH CHECK ADD  CONSTRAINT [FK_CART_USUARIOS_ENTIDADES_CART_ENTIDADES] FOREIGN KEY([id_entidad])
REFERENCES [dbo].[CART_ENTIDADES] ([id])
GO
ALTER TABLE [dbo].[CART_USUARIOS_ENTIDADES] CHECK CONSTRAINT [FK_CART_USUARIOS_ENTIDADES_CART_ENTIDADES]
GO
