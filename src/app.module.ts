import {HttpModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioModule} from './usuario/usuario.module';
import {Usuario} from "./usuario/entities/usuario.entity";
import {AlumnoModule} from './alumno/alumno.module';
import {Alumno} from "./alumno/entities/alumno.entity";
import {ProfesorModule} from './profesor/profesor.module';
import {Profesor} from "./profesor/entities/profesor.entity";
import {EstiloAprendizajeModule} from './estilo-aprendizaje/estilo-aprendizaje.module';
import {EstiloAprendizaje} from "./estilo-aprendizaje/entities/estilo-aprendizaje.entity";
import {PreguntasModule} from './preguntas/preguntas.module';
import {Preguntas} from "./preguntas/entities/preguntas.entity";
import {RespuestasModule} from './respuestas/respuestas.module';
import {Respuestas} from "./respuestas/entities/respuestas.entity";
import {CuestionarioEstiloAprendizajeModule} from './cuestionario-estilo-aprendizaje/cuestionario-estilo-aprendizaje.module';
import {CuestionarioEstiloAprendizaje} from "./cuestionario-estilo-aprendizaje/entities/cuestionario-estilo-aprendizaje.entity";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./guards/roles.guard";
import {EstiloAprendizajeAlumno} from "./estilo-aprendizaje-alumno/entities/estilo-aprendizaje-alumno.entity";
import {EstiloAprendizajeAlumnoModule} from "./estilo-aprendizaje-alumno/estilo-aprendizaje-alumno.module";
import { UnidadAprendizajeModule } from './unidad-aprendizaje/unidad-aprendizaje.module';
import {UnidadAprendizaje} from "./unidad-aprendizaje/entities/unidad-aprendizaje.entity";
import { UnidadCursoModule } from './unidad-curso/unidad-curso.module';
import {UnidadCurso} from "./unidad-curso/entities/unidad-curso.entity";
import { CursosModule } from './cursos/cursos.module';
import {Curso} from "./cursos/entities/curso.entity";
import { TemaUnidadModule } from './tema-unidad/tema-unidad.module';
import {TemaUnidad} from "./tema-unidad/entities/tema-unidad.entity";
import { NivelConocimientoModule } from './nivel-conocimiento/nivel-conocimiento.module';
import {NivelConocimiento} from "./nivel-conocimiento/entities/nivel-conocimiento.entity";
import { NivelConocimientoTemaPreguntasModule } from './nivel-conocimiento-tema-preguntas/nivel-conocimiento-tema-preguntas.module';
import {NivelConocimientoTemaPregunta} from "./nivel-conocimiento-tema-preguntas/entities/nivel-conocimiento-tema-pregunta.entity";
import { CaptchaModule } from './captcha/captcha.module';
import { RecursosEducativosModule } from './recursos-educativos/recursos-educativos.module';
import {RecursosEducativo} from "./recursos-educativos/entities/recursos-educativo.entity";
import { RecursosEducativosTemasModule } from './recursos-educativos-temas/recursos-educativos-temas.module';
import {RecursosEducativosTema} from "./recursos-educativos-temas/entities/recursos-educativos-tema.entity";
import { AlumnoCursaModule } from './alumno-cursa/alumno-cursa.module';
import {AlumnoCursa} from "./alumno-cursa/entities/alumno-cursa.entity";
import { AlumnoCursaRespuestaModule } from './alumno-cursa-respuesta/alumno-cursa-respuesta.module';
import {AlumnoCursaRespuesta} from "./alumno-cursa-respuesta/entities/alumno-cursa-respuesta.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'lemusdev.cj7cfn1vlm7c.us-east-1.rds.amazonaws.com',
            port: 3306,
            username: 'laura',
            password: 'LauraPT2_123.',
            database: 'SRP_DL',
            synchronize: false,
            timezone: 'utc',
            entities: [
                Usuario,
                Alumno,
                Profesor,
                EstiloAprendizaje,
                Preguntas,
                Respuestas,
                CuestionarioEstiloAprendizaje,
                EstiloAprendizajeAlumno,
                Curso,
                UnidadAprendizaje,
                UnidadCurso,
                TemaUnidad,
                NivelConocimiento,
                NivelConocimientoTemaPregunta,
                RecursosEducativo,
                RecursosEducativosTema,
                AlumnoCursa,
                AlumnoCursaRespuesta
            ],
            migrationsTableName: "custom_migration_table",
            migrations: ["migration/*.js"],
        }),
        UsuarioModule,
        AlumnoModule,
        ProfesorModule,
        EstiloAprendizajeModule,
        PreguntasModule,
        RespuestasModule,
        CuestionarioEstiloAprendizajeModule,
        EstiloAprendizajeAlumnoModule,
        UnidadAprendizajeModule,
        UnidadCursoModule,
        CursosModule,
        TemaUnidadModule,
        NivelConocimientoModule,
        NivelConocimientoTemaPreguntasModule,
        CaptchaModule,
        RecursosEducativosModule,
        RecursosEducativosTemasModule,
        AlumnoCursaModule,
        AlumnoCursaRespuestaModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {
}
