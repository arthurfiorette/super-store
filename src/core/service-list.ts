import { AxiosClient } from '../http/axios';
import { SESocketListener } from '../se/socket-listener';
import { ServiceConstructor } from './service';

export const Services: ServiceConstructor[] = [AxiosClient, SESocketListener];
