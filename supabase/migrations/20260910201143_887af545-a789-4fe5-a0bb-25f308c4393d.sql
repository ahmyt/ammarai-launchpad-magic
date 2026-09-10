CREATE OR REPLACE FUNCTION public.record_contact_confirmation(_id uuid, _status text, _message_id text, _response text, _error text, _attempted_at timestamp with time zone)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  updated int;
BEGIN
  IF _status NOT IN ('sent', 'failed') THEN
    RETURN false;
  END IF;
  UPDATE public.contact_messages
     SET confirmation_status = _status,
         confirmation_message_id = left(_message_id, 500),
         confirmation_response = left(_response, 500),
         confirmation_error = left(_error, 500),
         confirmation_attempted_at = coalesce(_attempted_at, now())
   WHERE id = _id
     AND confirmation_status = 'not_sent'
     AND created_at > now() - interval '15 minutes';
  GET DIAGNOSTICS updated = ROW_COUNT;
  RETURN updated > 0;
END;
$function$;

GRANT EXECUTE ON FUNCTION public.record_contact_confirmation(uuid, text, text, text, text, timestamp with time zone) TO anon, authenticated, service_role;