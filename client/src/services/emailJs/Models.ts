export type EmailJsType = {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: {
    from_email: string;
    title: string;
    message: string;
  };
};
