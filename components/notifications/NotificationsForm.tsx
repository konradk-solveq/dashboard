import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Grid, Input, Label } from 'theme-ui';
import Select from 'react-select'
import notificationStyle from '../../styles/NotificationsForm.module.css'


const NotificationsForm: React.FC<{}> = (props) => {  
  const typeOptions = [
      { value: "documents", label: "Dokument" },
      { value: "info", label: "Info" },
      { value: "noType", label: "Inny" }
    ]
  
  const langOptions = [
      { value: "pl-PL", label: "Polski" },
      { value: "de-DE", label: "Niemiecki" },
      { value: "en-EN", label: "Angielski" }
    ]

  const { register, handleSubmit,formState: { errors }, control } = useForm()
  const onSubmit = data => console.log(data);
  return (
      <form className={notificationStyle.content} onSubmit={handleSubmit(onSubmit)}>
          <div>
        <Grid gap={4} columns="50px 380px 1fr" marginBottom="10px">
              <Label>Tytuł</Label>
              <Input type="text" {...register('title', { required: true })} />
              {errors.title && <p>Tytuł jest wymagany.</p>}
          </Grid>
          <Grid gap={4} columns="50px 380px 1fr" marginBottom="10px">
              <Label >Treść</Label>
              <textarea type="text" {...register('message', { required: true })}/>
              {errors.message && <p>Treść jest wymagana.</p>}
          </Grid>

          <Grid gap={4} columns="50px 380px 1fr" marginBottom="10px">
              <Label>Język</Label>
              <Controller
              control={control}
              defaultValue={null}
              rules={{ required: "Język jest wymagany."}}
              name="language"
              render={({ field }) => (
                  <Select options={langOptions} {...field}/>
                )}
              /> 
              {errors.language && <p>{errors.language.message}</p>}
          </Grid>
          <Grid gap={4} columns="50px 380px 1fr" marginBottom="10px">
                <Label>Język domyślny</Label>
                <Controller
                control={control}
                defaultValue={null}
                rules={{ required: "Język domyślny jest wymagany." }}
                name="fallbackLanguage"
                render={({ field }) => (
                    <Select options={langOptions} {...field}/>
                  )}  
                  />
                {errors.fallbackLanguage && <p>{errors.fallbackLanguage.message}</p>}

            </Grid>  
          
          <Grid gap={4} columns="50px 380px 1fr" marginBottom="10px">
              <Label>Typ</Label>
              <Controller
              control={control}
              defaultValue={null}
              rules={{ required: "Typ domyślny jest wymagany." }}
              name="type"
              render={({ field }) => (
                  <Select options={typeOptions} {...field}/>
                )}
              />
              {errors.type && <p>{errors.type.message}</p>}
          </Grid>

         <div className={notificationStyle.buttonContainer}>
           {/* Redirect to notifications edit after clicking and submit the data to fields */}
         <Button type="submit">
              Dodaj powiadomienie
          </Button>

         </div>
          </div>
      </form>
    );
}

export default NotificationsForm